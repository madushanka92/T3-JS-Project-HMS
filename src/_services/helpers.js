/**
 * Function to get feature access properties based on feature name.
 * @param {string} featureName - The name of the feature to check access for.
 * @returns {Object} - Access properties for the given feature (e.g. canRead, canCreate).
 */
const getFeatureAccess = (featureName) => {
    const featuresArray = JSON.parse(
        localStorage.getItem("featureSettings")
    );
    // Find the feature access object for the given featureName
    const feature = featuresArray.find(f => f.featureId.featureName === featureName);

    // If feature is found, return the access properties
    if (feature) {
        return {
            canRead: feature.canRead || false,
            canCreate: feature.canCreate || false,
            canUpdate: feature.canUpdate || false,
            canDelete: feature.canDelete || false,
        };
    }

    // Return default access (no permissions) if feature is not found
    return {
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
    };
};

export { getFeatureAccess }
