# TitanStar Legends Rune Mastery Loadout Talent Calculator 9000

This is a test application made for Wizards. Following the guidelines and assets provided [here](https://github.com/DnDBeyond/front-end-developer-challenge?tab=readme-ov-file) .
I followed up the rules they describe and the functionality they wanted on the project and also added extra features.

![image](https://github.com/omichaelv/titanstar-legends-ts/assets/76706433/24fda4bf-4916-47c0-89db-edf0b2b9c5d0)


# Project Details

The project follows a folder structure that enables to easily maintain the code. This is the structure:

 - Public Folder
 - src folder
	 - assets
	 - components
	 - interfaces
	 - modules

The assets folders holds all the assets in subfolders depending if they are images or sounds. 
The component folder holds all the components group by subfolders. The interface folder has all our custom interface that we need on the project and the modules all the modules that we need (wav module so that react ts identifies .wav files)

## Expected Rules
The calculator has the following rules:
-   Left click to add points.
-   Right click to remove points.
-   The user may only use up to 6 points.
-   Each item only accounts for one point.
-   Displays current point total
-   The user must select the items in order.
    -   For example: The user may not put a point in the cake without first having put points in the chevrons and the silverware (in that order).


## Extra Features
Aside the expected features I added the following:

 - Sound effects when activating or deactivating runes.
 - Reset button to refund all skill points
 - Share button that creates a screenshot of the loadout, as this is a tool for a community they might want to share the builds they make.
 - Notification message when trying to activate a rune without any more skillpoints.
 - Hover box that show the rune description.
