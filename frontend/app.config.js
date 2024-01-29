export default ({ config }) => {
    return {
        ...config,
        plugins: [
            [
                "expo-build-properties",
                {
                    android: {
                        compileSdkVersion: 34,
                        targetSdkVersion: 34,
                        buildToolsVersion: "34.0.0",
                        usesCleartextTraffic: true,
                        permissions: [
                            "READ_EXTERNAL_STORAGE",
                            "WRITE_EXTERNAL_STORAGE",
                            "RECEIVE_BOOT_COMPLETED",
                            "VIBRATE",
                            "SCHEDULE_EXACT_ALARM",
                        ],
                    },
                    ios: {
                        deploymentTarget: "13.4",
                    },
                },
            ],
            [
                "expo-notifications",
                {
                    icon: "./local/assets/notification-icon.png",
                    color: "#000000",
                    androidMode: "default",
                    androidCollapsedTitle: "SmartLetter",
                    androidAllowWhileIdle: true,
                },
            ],
        ],
    };
}