export const getFeaturePermissions = (featureName) => {
    // Fetch feature settings from localStorage
    const featureSettings = JSON.parse(localStorage.getItem("featureSettings")) || [];

    // Find the specific feature by name
    const feature = featureSettings.find(
        (f) => f.featureId.featureName === featureName
    );

    // Return an object with all permissions, defaulting to false if the feature doesn't exist
    return {
        canRead: feature?.canRead || false,
        canCreate: feature?.canCreate || false,
        canUpdate: feature?.canUpdate || false,
        canDelete: feature?.canDelete || false,
    };
};