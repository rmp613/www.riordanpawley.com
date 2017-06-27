Assumptions:
   The structure of each line shown in the test input (except for the last line)
   shows how similar lines should be structured
   Currency and good type are the only words with first letter capitalised.
   Currency and good type always have their first letter capitalised.
   Currency is always Credits.
   Any alien word will always equal a single roman numeral.
   Lines describing alien words will always come before lines that need the
   words to form a response.


Design:
   Testing: 
      I used QUnit (JQuery's testing suite) to test my code.
      Tests are run on the test.html page.
      Each module has its own test module inside the test directory with the
      naming scheme modulename-spec.js
      To accomplish testing of private functions and variables I appended these
      to the api of each module with an underscore prefix to show that they are 
      intended to be private.
      In order to run a functional test of the app I used an AJAX request
      function to load a text file for testing. I had to do this because it was
      impossible to trick FileReader into loading the file.
      I tried to implement a lot of unit tests so that the code would be easier
      to maintain and evolve.
   
   Object Oriented: 
      I split my code up into 3 modules:
         interface: handles interactions with the DOM and the loading of the 
            file.
         noteProcessor: processes the loaded file and returns responses for 
            each line in the input text file that requires them.
         utility: a collection of useful functions that could be used in many
            different modules.

   File Input:
      To avoid using external libraries to solve this problem I used a 
      relatively new javascript API called FileReader. 
      FileReader API is fully supported by 88.7% of current browser market share 
      with an additional 4.1% worth of partial support.

   Issues:
      I had some issues with caching so if something isn't working correctly
      try ctrl-f5 or cmd-shift-r or any other command that clears the cache.