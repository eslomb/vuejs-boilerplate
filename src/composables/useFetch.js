import { ref } from 'vue';

export function useFetch(defaultOptions = {}) {
    const data = ref(null);
    const errorMessage = ref(null);
    const errorCode = ref(null);
    const loading = ref(false);

    let currentController = null; // store the current AbortController

    const call = async (url, payload = null, options = {}) => {
        // Cancel previous request if still running
        if (currentController) {
            currentController.abort();
        }

        loading.value = true;        
        errorMessage.value = null;
        errorCode.value = null;
        data.value = null;

        currentController = new AbortController();
        const timeout = options.timeout || defaultOptions.timeout || 30000;
        const timer = setTimeout(() => currentController.abort(), timeout);

        try {
            const response = await fetch(url, {
                method: options.method || defaultOptions.method || (payload ? 'POST' : 'GET'),
                headers: {
                    'Content-Type': 'application/json',
                    ...(defaultOptions.headers || {}),
                    ...(options.headers || {}),
                },
                body: payload ? JSON.stringify(payload) : null,
                signal: currentController.signal,
            });

            clearTimeout(timer);

            errorCode.value = response.status;
            if (!response.ok) {
                errorMessage.value = `Error ${response.status}: ${response.statusText}`;
                return;
            }

            data.value = await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                errorMessage.value = 'Request canceled or timed out';
                errorCode.value = 'ABORTED';
            } else {
                errorMessage.value = error.message;
                errorCode.value = 'NETWORK_ERROR';
            }
        } finally {
            loading.value = false;
            currentController = null;
        }
    };

    return {
        data,
        errorMessage,
        errorCode,
        loading,
        call,
    };
}
