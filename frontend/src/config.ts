import * as $script from 'scriptjs';

// This interface needs to be aligned with the contents of 'config.js'.
interface Config {
    TV_SHOWS_BASE_URL: string;
}

class ConfigManager {
    private static configPromise: Promise<Config> = new Promise((resolve, reject) => {
        $script('config.js', () => {
            // Check whether config was successfully set.
            const config: Config = (window as any).tvbrowser_config;
            if (config) {
                resolve(config);
            } else {
                reject();
            }
        });
    });

    static getConfig = (): Promise<Config> => ConfigManager.configPromise;
}

export default ConfigManager;
