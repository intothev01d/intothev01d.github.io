---
layout: post
title: Time Tracking with IFTTT and Google - Part 1
---

[IFTTT](https://ifttt.com/wtf) is a service that allows you to link other services together based on triggers.
[Google](https://www.google.com/) has several services that can be enabled with IFTTT, including Google Drive and Google Calendar. Using these you can automate a spreadsheet for time tracking or schedule information by simply adding events to your calendar.

I initially wanted a way to share calendar information and also have that information logged automatically in a spreadsheet. Luckily I'm familair with IFTTT and knew that it might offer the actions I needed to automate this type of process. If you haven't already, create your accounts with IFTTT and Google.

First you'll want to either use your default Google calendar or create a new one. If you want to invite others to the calendar, you can view info about that [here](https://support.google.com/calendar/answer/143754?hl=en). Once you have the calendar you want to track created you're ready to set up IFTTT channels and create a receipe.

Go to IFTTT channels and enable Google Drive and Google Calendar. Make sure to enable the calendar your tracking when you turn on the channel. Now create a receipe with Google Calendar as the "this" channel option and select "Any event starts" as the trigger. Select the Google Drive channel for the "that" option and choose "Add row to a spreadsheet" as the action. You'll be presented with action fields. Name the spreadsheet whatever you want and give it a folder path where you want it stored on Google Drive. You can remove options for the formatted rows or rearrange them, however if you use the code below you will need to know the location of the start and date columns in your spreadsheet.

If all you want is rows to be generated into a spreadsheet for each calendar event, then you're done! Adding events to the calendar will have them automatically show up as a new row in your spreadsheet.
*one issue I have noticed is that it can take some time for things to get updated across services and so the events should be added at least ~30 minutes or so before they happen to be safe that it picks them up and adds them. Generally not a problem, but something I found when testing things out.*

Another issue I ran into with this is that the start and end time actually get inserted into the rows with the word 'at' in them. This is a valid format option in the spreadsheet however it doesn't recognize this as a date and therefore can't convert as needed since it is a string. This problem is solved however since you can write javascript functions with [Google Apps Scripts](https://developers.google.com/apps-script/) to fix it.

To add scripts to your spreadsheet, first make sure the spreadsheet exists. This will be the location and file name you specified in the receipe. It won't be there yet unless an event has already happened. If it's not, go ahead and create it. After opening the file you'll select the menu options where you'll select Tools > Script editor. It will open a new tab and present options to Creat Script for, choose Spreadsheet. The default will give you the onOpen function and a readRows function. You can leave the readRows if you want, we'll be using the onOpen and creating a separate one to fix the dates.

Below is the fixDateTime() function that simply removes the word 'at' from all start and end time cells. After doing so the spreadsheet will recognize the cell as a date format and be able to convert or use for other calcuations. This function is called in the onOpen so every time the sheet is viewed it will run. You can remove that call if you want to manually run it. It's added into the script menu options which will show in the Script Center Menu after it's created. Copy and paste the relevant code below into your script and save.

*The code makes the assumption that the start and end dates are in certain columns. If they are not the same for your sheet, in that you removed items or rearranged the format in the receipe you created, then you'll need to change the startTimeCol and endTimeCol values.*

<script src="https://gist.github.com/Lbatson/90316d9cc3124434b595.js"></script>

So, you've now got a spreadsheet that records every event in your calendar with correctly formated date and times. Since they are valid numbers now you can do things like calculate duration of the times in the cells. I've found the easiest way is to add a column at the end that will add a cell to each row with the duration by subtracting the end time from the start time. The formula uses arrayformula which will calcuate all future rows as well. Make sure to use the end time column letter in first and start date last in the below formula and format the column as number -> duration.

```
=ARRAYFORMULA(E2:E-D2:D)
```

In Part 2, I'll go over sending weekly (or any other specified time) emails of the sheet, clearing it out for reuse, and copying/archiving them as well.
