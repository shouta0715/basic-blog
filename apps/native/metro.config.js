const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

/**
 * @see https://www.better-auth.com/docs/integrations/expo#configure-metro-bundler
 */
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativewind(config);
