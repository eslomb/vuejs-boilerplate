/**
 * Autoregistrar componentes y otros elementos al montar la app
 * inspirado en https://zerotomastery.io/blog/how-to-auto-register-components-for-vue-with-vite/
 */

export default {
    install(app) {
        
        const SharedFiles = import.meta.glob('@/components/shared/*.vue', {eager: true});

        Object.entries(SharedFiles).forEach(([path, component]) => {
            
            const componentName = 
                path
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
            ;

            app.component(
                `Shared${componentName}`, component.default
            );            
        })
    },
};