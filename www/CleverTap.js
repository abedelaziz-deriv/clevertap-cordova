//  Copyright (C) 2015 CleverTap
//
//  This code is provided under a commercial License.
//  A copy of this license has been distributed in a file called LICENSE
//  with this source code.
//
const exec = require('cordova/exec');

/*******************
 * notify device ready
 * NOTE: in iOS use to be notified of launch Push Notification or Deep Link
    in Android use only in android phonegap build projects
 ******************/
exports.notifyDeviceReady = function () {
    exec(null, null, "CleverTapPlugin", "notifyDeviceReady", []);
}

/*******************
 * Personalization
 ******************/
// Enables the Personalization API
exports.enablePersonalization = function () {
	exec(null, null, "CleverTapPlugin", "enablePersonalization", []);
}

// Disables the Personalization API
exports.disablePersonalization = function () {
    exec(null, null, "CleverTapPlugin", "disablePersonalization", []);
}

//Enables tracking opt out for the currently active user.
exports.setOptOut = function (value) {
    exec(null, null, "CleverTapPlugin", "setOptOut", [value]);
}

//Sets CleverTap SDK to offline mode.
exports.setOffline = function (value) {
    exec(null, null, "CleverTapPlugin", "setOffline", [value]);
}

//Enables the reporting of device network related information, including IP address.  This reporting is disabled by default.
exports.enableDeviceNetworkInfoReporting = function (value) {
    exec(null, null, "CleverTapPlugin", "enableDeviceNetworkInfoReporting", [value]);
}

/*******************
 * Push
 ******************/
// Registers for push notifications
exports.registerPush = function () {
    exec(null, null, "CleverTapPlugin", "registerPush", []);
}

// Sets the devices push token
exports.setPushToken = function (token) {
    exec(null, null, "CleverTapPlugin", "setPushTokenAsString", [token]);
}

// Sets the devices Baidu push token
exports.setPushBaiduToken = function (token) {
    exec(null, null, "CleverTapPlugin", "setPushBaiduTokenAsString", [token]);
}

// Sets the devices Huawei push token
exports.setPushHuaweiToken = function (token) {
    exec(null, null, "CleverTapPlugin", "setPushHuaweiTokenAsString", [token]);
}

//Create Notification Channel for Android O

exports.createNotification = function (extras) {
    exec(null,null, "CleverTapPlugin", "createNotification", [extras]);
}

exports.createNotificationChannel = function (channelID, channelName, channelDescription, importance, showBadge) {
    exec(null,null, "CleverTapPlugin", "createNotificationChannel", [channelID, channelName, channelDescription, importance, showBadge]);
}

exports.createNotificationChannelWithSound = function (channelID, channelName, channelDescription, importance, showBadge,sound) {
    exec(null,null, "CleverTapPlugin", "createNotificationChannelWithSound", [channelID, channelName, channelDescription, importance, showBadge, sound]);
}

//Create Notification Channel with Group ID for Android O
exports.createNotificationChannelWithGroupId = function (channelID, channelName, channelDescription, importance, groupId, showBadge) {
    exec(null,null, "CleverTapPlugin", "createNotificationChannelWithGroupId", [channelID, channelName, channelDescription, importance, groupId, showBadge]);
}

exports.createNotificationChannelWithGroupIdAndSound = function (channelID, channelName, channelDescription, importance, groupId, showBadge, sound) {
    exec(null,null, "CleverTapPlugin", "createNotificationChannelWithGroupIdAndSound", [channelID, channelName, channelDescription, importance, groupId, showBadge, sound]);
}

//Create Notification Channel Group for Android O
exports.createNotificationChannelGroup = function (groupId, groupName) {
    exec(null,null, "CleverTapPlugin", "createNotificationChannelGroup", [groupId, groupName]);
}

//Delete Notification Channel  for Android O
exports.deleteNotificationChannel = function (channelID) {
    exec(null,null, "CleverTapPlugin", "deleteNotificationChannel", [channelID]);
}

//Delete Notification Channel Group  for Android O
exports.deleteNotificationChannelGroup = function (groupId) {
    exec(null,null, "CleverTapPlugin", "deleteNotificationChannelGroup", [groupId]);
}


/*******************
 * Events
 ******************/

// Record Screen View, iOS only
// screenName = string
exports.recordScreenView = function (screenName) {
    exec(null, null, "CleverTapPlugin", "recordScreenView", [screenName]);
}

// Record Event with Name
// eventName = string
exports.recordEventWithName = function (eventName) {
    exec(null, null, "CleverTapPlugin", "recordEventWithName", [eventName]);
}

// Record Event with Name and Event properties
// eventName = string
// eventProps = object
exports.recordEventWithNameAndProps = function (eventName, eventProps) {
    convertDateToEpochInProperties(eventProps)
    exec(null, null, "CleverTapPlugin", "recordEventWithNameAndProps", [eventName, eventProps]);
}

// Record Charged Event with Details and Items
// details = object with transaction details
// items = array of items purchased
exports.recordChargedEventWithDetailsAndItems = function (details, items) {
    convertDateToEpochInProperties(details)
    // iterate over the array & convert the date items to CleverTap's server supported $D String
    for (var i = 0; i < items.length; i++) {
        convertDateToEpochInProperties(items[i])
    }
    exec(null, null, "CleverTapPlugin", "recordChargedEventWithDetailsAndItems", [details, items]);
}

// Get Event First Time
// eventName = string
// successCallback = callback function for result
// success returns epoch seconds or -1
exports.eventGetFirstTime = function (eventName, successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "eventGetFirstTime", [eventName]);
}

// Get Event Last Time
// eventName = string
// successCallback = callback function for result
// success returns epoch seconds or -1
exports.eventGetLastTime = function (eventName, successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "eventGetLastTime", [eventName]);
}

// Get Event Get Occurrences
// successCallback = callback function for result
// success calls back with int or -1
exports.eventGetOccurrences = function (eventName, successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "eventGetOccurrences", [eventName]);
}

// Get Event Get Details
// successCallback = callback function for result
// success calls back with object {"eventName": <string>, "firstTime":<epoch seconds>, "lastTime": <epoch seconds>, "count": <int>} or empty object
exports.eventGetDetails = function (eventName, successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "eventGetDetails", [eventName]);
}

// Get Event History
// successCallback = callback function for result
// success calls back with object {"eventName1":<event1 details object>, "eventName2":<event2 details object>}
exports.getEventHistory = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "getEventHistory", []);
}


/*******************
 * Profiles
 ******************/

/**
Get the device location if available.

On iOS:
Calling this will prompt the user location permissions dialog.
Please be sure to include the NSLocationWhenInUseUsageDescription key in your Info.plist.
Uses desired accuracy of kCLLocationAccuracyHundredMeters.
If you need background location updates or finer accuracy please implement your own location handling.

On Android:
Requires Location Permission in AndroidManifest e.g. "android.permission.ACCESS_COARSE_LOCATION"

You can use location to pass it to CleverTap via the setLocation API
for, among other things, more fine-grained geo-targeting and segmentation purposes.

successCallback = callback function for result
errorCallback = callback function in case of error
success returns {lat:lat, lon:lon} lat and lon are floats
error returns a reason string

Note: on iOS the call to CleverTapSDK must be made on the main thread due to LocationManager restrictions, but the CleverTapSDK method itself is non-blocking.
*/
exports.getLocation = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, "CleverTapPlugin", "getLocation", []);
}

// Set location
// lat = float
// lon = float
exports.setLocation = function (lat, lon) {
    exec(null, null, "CleverTapPlugin", "setLocation", [lat, lon]);
}

/**
 Creates a separate and distinct user profile identified by one or more of Identity, Email, FBID or GPID values,
 and populated with the key-values included in the profile dictionary.

 If your app is used by multiple users, you can use this method to assign them each a unique profile to track them separately.

 If instead you wish to assign multiple Identity, Email, FBID and/or GPID values to the same user profile,
 use profileSet rather than this method.

 If none of Identity, Email, FBID or GPID is included in the profile dictionary,
 all properties values will be associated with the current user profile.

 When initially installed on this device, your app is assigned an "anonymous" profile.
 The first time you identify a user on this device (whether via onUserLogin or profileSet),
 the "anonymous" history on the device will be associated with the newly identified user.

 Then, use this method to switch between subsequent separate identified users.

 Please note that switching from one identified user to another is a costly operation
 in that the current session for the previous user is automatically closed
 and data relating to the old user removed, and a new session is started
 for the new user and data for that user refreshed via a network call to CleverTap.
 In addition, any global frequency caps are reset as part of the switch.

 profile = object
 */
exports.onUserLogin = function (profile) {
    convertDateToEpochInProperties(profile)
    exec(null, null, "CleverTapPlugin", "onUserLogin", [profile]);
}

// Set profile attributes
// profile = object
exports.profileSet = function (profile) {
    convertDateToEpochInProperties(profile)
    exec(null, null, "CleverTapPlugin", "profileSet", [profile]);
}

// Get User Profile Property
// propertyName = string
// successCallback = callback function for result
// success calls back with value of propertyName or false
exports.profileGetProperty = function (propertyName, successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "profileGetProperty", [propertyName]);
}

/**
* @deprecated This method is deprecated in v2.3.5. Use getCleverTapID() instead.
* Get a unique CleverTap identifier suitable for use with install attribution providers
* successCallback = callback function for result
* success returns the unique CleverTap attribution identifier
*/
exports.profileGetCleverTapAttributionIdentifier = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "profileGetCleverTapAttributionIdentifier", []);
}

/**
* @deprecated This method is deprecated in v2.3.5. Use getCleverTapID() instead.
* Get User Profile CleverTapID
* successCallback = callback function for result
* success calls back with CleverTapID or false
*/
exports.profileGetCleverTapID = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "profileGetCleverTapID", []);
}

// Get User Profile CleverTapID
// successCallback = callback function for result
// success calls back with CleverTapID or false
exports.getCleverTapID = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "getCleverTapID", []);
}

// Remove the property specified by key from the user profile
// key = string
exports.profileRemoveValueForKey = function (key) {
    exec(null, null, "CleverTapPlugin", "profileRemoveValueForKey", [key]);
}

// Method for setting a multi-value user profile property.
// key = string
// values = array of strings
exports.profileSetMultiValues = function (key, values) {
    exec(null, null, "CleverTapPlugin", "profileSetMultiValues", [key, values]);
}

// Method for adding a value to a multi-value user profile property.
// key = string
// value = string
exports.profileAddMultiValue = function (key, value) {
    exec(null, null, "CleverTapPlugin", "profileAddMultiValue", [key, value]);
}

// Method for adding values to a multi-value user profile property.
// key = string
// values = array of strings
exports.profileAddMultiValues = function (key, values) {
    exec(null, null, "CleverTapPlugin", "profileAddMultiValues", [key, values]);
}

// Method for removing a value from a multi-value user profile property.
// key = string
// value = string
exports.profileRemoveMultiValue = function (key, value) {
    exec(null, null, "CleverTapPlugin", "profileRemoveMultiValue", [key, value]);
}

// Method for removing values from a multi-value user profile property.
// key = string
// values = array of strings
exports.profileRemoveMultiValues = function (key, values) {
    exec(null, null, "CleverTapPlugin", "profileRemoveMultiValues", [key, values]);
}
// Method for incrementing a value for a single-value profile property (if it exists).
// key = string
// value = number
exports.profileIncrementValueBy = function (key, value) {
    exec(null, null, "CleverTapPlugin", "profileIncrementValueBy", [key, value]);
}

// Method for decrementing a value for a single-value profile property (if it exists).
// key = string
// value = number
exports.profileDecrementValueBy = function (key, value) {
    exec(null, null, "CleverTapPlugin", "profileDecrementValueBy", [key, value]);
}

/*******************
 * Session
 ******************/

// Get Session Elapsed Time
// successCallback = callback function for result
// success calls back with seconds
exports.sessionGetTimeElapsed = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "sessionGetTimeElapsed", []);
}

// Get Session Get Total Visits
// successCallback = callback function for result
// success calls back with int or -1
exports.sessionGetTotalVisits = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "sessionGetTotalVisits", []);
}

// Get Sesssion Screen Count
// successCallback = callback function for result
// success calls back with int
exports.sessionGetScreenCount = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "sessionGetScreenCount", []);
}

// Get Sesssion Get Previous Visit Time
// successCallback = callback function for result
// success calls back with epoch seconds or -1
exports.sessionGetPreviousVisitTime = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "sessionGetPreviousVisitTime", []);
}

// Get Sesssion Get Referrer UTM details
// successCallback = callback function for result
// success calls back with  object {"source": <string>, "medium": <string>, "campaign": <string>} or empty object
exports.sessionGetUTMDetails = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "sessionGetUTMDetails", []);
}

// Call this to manually track the utm details for an incoming install referrer.
// source = string               the utm source
// medium = string               the utm medium
// campaign = string             the utm campaign
exports.pushInstallReferrer = function (source, medium, campaign) {
    exec(null, null, "CleverTapPlugin", "pushInstallReferrer", [source, medium, campaign]);
}

/*******************
 * Developer Options
 ******************/
// Set the debug level, 0 is off, 1 is on
// level = int
exports.setDebugLevel= function (level) {
	exec(null, null, "CleverTapPlugin", "setDebugLevel", [level]);
}

/****************************
 * Notification Inbox methods
 ****************************/
// Initializes the app inbox

exports.initializeInbox= function () {
    exec(null, null, "CleverTapPlugin", "initializeInbox", []);
}

// Get Unread Inbox Message count for the user
// successCallback = callback function for result
// success calls back returns the total number of unread inbox messages for the user
exports.getInboxMessageUnreadCount = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "getInboxMessageUnreadCount", []);
}

// Get Inbox Message count for the user
// successCallback = callback function for result
// success calls back returns the total number of inbox messages for the user
exports.getInboxMessageCount = function (successCallback) {
     exec(successCallback, null, "CleverTapPlugin", "getInboxMessageCount", []);
}

exports.showInbox = function (styleConfig) {
    exec(null, null, "CleverTapPlugin", "showInbox", [styleConfig]);
}

exports.getAllInboxMessages = function (successCallback) {
     exec(successCallback, null, "CleverTapPlugin", "getAllInboxMessages", []);
}

exports.getUnreadInboxMessages = function (successCallback) {
     exec(successCallback, null, "CleverTapPlugin", "getUnreadInboxMessages", []);
}

exports.getInboxMessageForId = function (messageId, successCallback) {
     exec(successCallback, null, "CleverTapPlugin", "getInboxMessageForId", [messageId]);
}

exports.deleteInboxMessageForId = function (messageId) {
     exec(null, null, "CleverTapPlugin", "deleteInboxMessageForId", [messageId]);
}

exports.deleteInboxMessagesForIds = function (messageIds) {
    exec(null, null, "CleverTapPlugin", "deleteInboxMessagesForIds", [messageIds]);
}

exports.markReadInboxMessageForId = function (messageId) {
     exec(null, null, "CleverTapPlugin", "markReadInboxMessageForId", [messageId]);
}

exports.markReadInboxMessagesForIds = function (messageIds) {
    exec(null, null, "CleverTapPlugin", "markReadInboxMessagesForIds", [messageIds]);
}

exports.dismissInbox= function () {
    exec(null, null, "CleverTapPlugin", "dismissInbox", []);
}

exports.pushInboxNotificationViewedEventForId = function (messageId) {
     exec(null, null, "CleverTapPlugin", "pushInboxNotificationViewedEventForId", [messageId]);
}

exports.pushInboxNotificationClickedEventForId = function (messageId) {
     exec(null, null, "CleverTapPlugin", "pushInboxNotificationClickedEventForId", [messageId]);
}

/*******************
 * In-App Controls
 ******************/
/**
 Suspends and saves inApp notifications until 'resumeInAppNotifications' is called for current session.
 Automatically resumes InApp notifications display on CleverTap shared instance creation. Pending inApp notifications are displayed only for current session.
 */
exports.suspendInAppNotifications = function () {
    exec(null, null, "CleverTapPlugin", "suspendInAppNotifications", []);
}

/**
 Discards inApp notifications until 'resumeInAppNotifications' is called for current session.
 Automatically resumes InApp notifications display on CleverTap shared instance creation. Pending inApp notifications are not displayed. */
exports.discardInAppNotifications = function () {
    exec(null, null, "CleverTapPlugin", "discardInAppNotifications", []);
}

/**
 Resumes displaying inApps notifications and shows pending inApp notifications if any.
 */
exports.resumeInAppNotifications = function () {
    exec(null, null, "CleverTapPlugin", "resumeInAppNotifications", []);
}

/****************************
 * Native Display methods
 ****************************/
exports.getAllDisplayUnits = function(successCallback){
	exec(successCallback, null, "CleverTapPlugin", "getAllDisplayUnits", []);
}

exports.getDisplayUnitForId = function(unitId, successCallback){
	exec(successCallback, null, "CleverTapPlugin", "getDisplayUnitForId", [unitId]);
}

exports.pushDisplayUnitViewedEventForID = function(unitId){
	exec(null, null, "CleverTapPlugin", "pushDisplayUnitViewedEventForID", [unitId]);
}

exports.pushDisplayUnitClickedEventForID = function(unitId){
	exec(null, null, "CleverTapPlugin", "pushDisplayUnitClickedEventForID", [unitId]);
}

/****************************
 * Feature Flag methods
 ****************************/
/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.getFeatureFlag = function(name,defaultValue,successCallback){
    exec(successCallback, null, "CleverTapPlugin", "getFeatureFlag", [name,defaultValue]);
}

/****************************
 * Product Config methods
 ****************************/
/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.setDefaultsMap = function(jsonMap){
    exec(null, null, "CleverTapPlugin", "setDefaultsMap", [jsonMap]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.fetch = function(){
    exec(null, null, "CleverTapPlugin", "fetch", []);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.fetchWithMinimumFetchIntervalInSeconds = function(interval){
    exec(null, null, "CleverTapPlugin", "fetchWithMinimumFetchIntervalInSeconds", [interval]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.activate = function(){
    exec(null, null, "CleverTapPlugin", "activate", []);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.fetchAndActivate = function(){
    exec(null, null, "CleverTapPlugin", "fetchAndActivate", []);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.setMinimumFetchIntervalInSeconds = function(interval){
    exec(null, null, "CleverTapPlugin", "setMinimumFetchIntervalInSeconds", [interval]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.getLastFetchTimeStampInMillis = function(successCallback){
    exec(successCallback, null, "CleverTapPlugin", "getLastFetchTimeStampInMillis", []);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.getString = function(key,successCallback){
    exec(successCallback, null, "CleverTapPlugin", "getString", [key]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.getBoolean = function(key,successCallback){
    exec(successCallback, null, "CleverTapPlugin", "getBoolean", [key]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.getLong = function(key,successCallback){
    exec(successCallback, null, "CleverTapPlugin", "getLong", [key]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.getDouble = function(key,successCallback){
    exec(successCallback, null, "CleverTapPlugin", "getDouble", [key]);
}

/**
 * @deprecated - Since version 2.7.0 and will be removed in the future versions of this SDK.
 */
exports.reset = function(){
    exec(null, null, "CleverTapPlugin", "reset", []);
}


/****************************
 * Product Experiences methods
 ****************************/

/**
 Uploads variables to the server. Requires Development/Debug build/configuration.
*/
exports.syncVariables = function(){
    exec(null, null, "CleverTapPlugin", "syncVariables", []);
}

/**
Uploads variables to the server.
@param {boolean} isProduction Provide `true` if variables must be sync in Productuon build/configuration.
*/
exports.syncVariablesinProd = function(isProduction){
    exec(null, null, "CleverTapPlugin", "syncVariablesinProd", [isProduction]);
}

/**
Forces variables to update from the server.
*/
exports.fetchVariables = function(successCallback){
    exec(successCallback, null, "CleverTapPlugin", "fetchVariables", []);
}

/**
Create variables.
@param {object} variables The JSON Object specifying the varibles to be created.
*/
exports.defineVariables = function (variables) {
    exec(null, null, "CleverTapPlugin", "defineVariables", [variables]);
}

/**
Get a variable or a group for the specified name.
@param {string} name - name.
*/
exports.getVariable = function (name, successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "getVariable", [name]);
}

/**
Get all variables via a JSON object.
*/
exports.getVariables = function (successCallback) {
    exec(successCallback, null, "CleverTapPlugin", "getVariables", []);
}

 /**
Adds a callback to be invoked when variables are initialised with server values. Will be called each time new values are fetched.
@param {function} handler The callback to add
*/
exports.onVariablesChanged = function (handler) {
    exec(handler, null, "CleverTapPlugin", "onVariablesChanged", []);
}

/**
Called when the value of the variable changes.
@param {name} string the name of the variable
@param {function} handler The callback to add
*/
exports.onValueChanged = function (name, handler) {
    exec(handler, null, "CleverTapPlugin", "onValueChanged", [name]);
}

/****************************
 * Android 13 Push Primer
 ****************************/

exports.promptPushPrimer = function(localInAppObject){
    exec(null, null, "CleverTapPlugin", "promptPushPrimer", [localInAppObject]);
}

exports.promptForPushPermission = function(showFallbackSettings){
    exec(null, null, "CleverTapPlugin", "promptForPushPermission", [showFallbackSettings]);
}

exports.isPushPermissionGranted = function(successCallback){
    exec(successCallback, null, "CleverTapPlugin", "isPushPermissionGranted", []);
}

// Set Locale
// locale = string
exports.setLocale = function (locale) {
    exec(null, null, "CleverTapPlugin", "setLocale", [locale]);
}

/**
Deletes all images and gifs which are preloaded for inapps in cs mode
@param {expiredOnly} to clear only assets which will not be needed further for inapps
*/
exports.clearInAppResources = function (expiredOnly) {
    exec(null, null, "CleverTapPlugin", "clearInAppResources", [expiredOnly]);
}

/**
Fetches In Apps from server.
@param {successCallback} Callback to be invoked when fetching is done.
*/
exports.fetchInApps = function(successCallback){
    exec(successCallback, null, "CleverTapPlugin", "fetchInApps", []);
}


function convertDateToEpochInProperties(items){
//Conversion of date object in suitable CleverTap format

    /*-------------- * -----------------
    |  input        =>        output    |
    * --------------------------------- *
    | new Date()    =>     $D_epoch     |
    ---------------- * ----------------- */
    for (let [key, value] of Object.entries(items)) {
            if (Object.prototype.toString.call(value) === '[object Date]') {
                items[key] = "$D_" + Math.floor(value.getTime()/1000);
            }
    }
}
