Notes:
File API is fully supported by 70% of current browser market share with an additional 22.8% worth of partial support.
FileReader API is fully supported by 88.7% of current browser market share with an additional 4.1% worth of partial support.
To match the word "is" by itself and not match any words that include the letters "is" I used /(?:^|\b)(is)(?=\b|$)/.
(?:^|\b) -> this part matches the start of the string or a word boundary
(is) -> this part matches the word "is"
(?=\b|$) -> this part matches the end of the string or a word boundary


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
         interface: handles interactions with the DOM and also the loading of 
            the file.
         noteProcessor: processes the loaded file and returns responses for 
            each line in the input text file that requires them.
         utility: a collection of useful functions that could be used in many
            different modules.
