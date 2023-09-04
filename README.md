# Flowtime
My name is Jian Ron and this is my CS50 final project!

Video Demo: [CS50x Final Project Flowtime]()

## Features:
* Framework: [React Native](https://reactnative.dev/docs/getting-started)
* State Container: [Redux](https://redux.js.org/introduction/getting-started)
* Database: [Firebase](https://firebase.google.com/docs)

## Overview:
Flowtime is a mobile application that is used for the purpose of productivity. This app was inspired by the Flowtime technique, 
an adaptation of the popular Pomodoro technique, read more about the Flowtime focus technique [here](https://zapier.com/blog/flowtime-technique/).

#### Description:
Flowtime allows the user to set their own ratio of break time to focus time and how ever long the user decides to focus, the
ratio will be used to calculate the time that the user will get to take a break. The user can also change in settings the
behavior of the break timer, to continue automatically once break timer ends or otherwise, to not save or save their break
time for later should they decide to end their break early, to turn on notifications for when their break ends, as well as
set tags to track what they focused on. Users can also see their study time in the Statistics page and also manage their
account, delete their account, change their email and password, and log out.

## Files:
| Screens | Description |
|------|-------------|
| about.js | Page explaining the app |
| break.js | This is the break timer page and in this page, settings are fetched, notifications handled, the break time is calculated, and a timer is starts counting down when the page opens |
| home.js | Front page, fetches saved settings from firebase and dispatches to redux, user can start focus time, adjust break time to focus time ratio, and change their focus tag |
| homestack.js | Contains navigation for the homestack, which contains the home page, focus page, and break page |
| navstack.js | Contains navigation for the homestack and drawer components, helps with loading the fonts for the app once logged in |
| profile.js | Allows the user to manage their profile by changing their email, password, deleting their account, or logging out, additionally also shows their total focus time on the app |
| settings.js | Page containing toggles that the user can use to adjust the behavior of the app as well as set notification preferences |
| statistics.js | Page where the user can look at their focus time by selecting dates from a calendar, which will be grouped by the tag |
| tags.js | Page where users can remove or add tags, listing down all the tags that they have |
| watch.js | Page displays a stopwatch and tracks the user's focus time and tag and updates to firebase |
| forgotpassword.tsx | Page where user can enter their email and a link will be sent to their email so they can reset their password |
| signin.tsx | Sign in page managed by firebase authentication |
| signup.tsx | Sign up page managed by firebase authentication |
| welcome.tsx | Welcome page which leads to signin.tsx or signup.tsx |