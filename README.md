# Shawn's UserScripts

These are scripts that make my day to day a bit better. Most of them are not well written.

## Scripts

### Banner Usability Fixes

Banner has awful formatting by default. These scripts adjust formatting on certain pages - including adding an all option for paginated output. Additionally, Student Profile Term Select adds a dropbown for selecting term without returning to term select and then advisee list.

* [Install Banner Class Browser Fix](https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-browseclasses.user.js)
* [Install Banner Advisee List Fix](https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-advisees.user.js)
* [Install Banner Profile Term Select](https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-profile-term-select.user.js)

### Realm Hint

RIS doesn't store ADFS realm hints. This script automatically enters DSU as your domain and clicks next for you.

* [Install Realm Hint Fix](https://raw.githubusercontent.com/sgzwach/userscripts/master/adfs-realmhint.user.js)

### D2L Usability Fixes

Save and Next changes the functionality of the "Next Student" button in the grade view of D2L to "Save and Next." Also will open the first matching document.
Daylight Tiny shrinks table cells to be less obnoxious in the default theme. Max Results will fire an event to refresh with the max results per page on most D2L lists/tables.
PDF View Fix adjusts the legacy pdf viewer to 100% of the parent all the time.

* [Install D2L Save & Next](https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-saveandnext.user.js)
* [Install D2L Daylight Tiny](https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-daylighttiny.user.js)
* [Install D2L Max Results](https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-maxresults.user.js)
* [Install D2L PDF View Fix](https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-pdfviewfix.user.js)

### IA Lab Scripts

Auto user filter grabs username from header and filters to that user's vApps. The WMKS revert opacity script (very pre-alpha status) checks if opacity is .5 and sets the opacity back to 1 if the console is connected. If not, it attempts to reset the connection if available (by a click).

* [VCDSP Username Filter](https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-vapp-filter-username.user.js)
* [VCDSP WMKS Revert Opacity](https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-opacity-override.user.js)
