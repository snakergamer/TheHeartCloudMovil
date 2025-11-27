module.exports = {
  expo: {
    name: "TheHearthCloud",
    slug: "thehearthcloud",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./src/assets/images/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.thehearthcloud"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.yourcompany.thehearthcloud"
    },
    web: {
      favicon: "./src/assets/images/favicon.png"
    },
    plugins: [],
    extra: {
      eas: {
        projectId: "4b63c9f1-0a0e-46cb-9a70-338e30c997c4"
      },
      VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY || "",
      VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN || "",
      VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID || "",
      VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET || "",
      VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID || ""
    }
  }
};
