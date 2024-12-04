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

// Helper function to format the date as dd-MM-yyyy
const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

// Helper function to format the time as hh:mm AM/PM
const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hour, minute] = timeString.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const formattedMinute = String(minute).padStart(2, "0");
    const ampm = isPM ? "PM" : "AM";

    return `${formattedHour}:${formattedMinute} ${ampm}`;
};

export { getFeatureAccess, formatDate, formatTime }
