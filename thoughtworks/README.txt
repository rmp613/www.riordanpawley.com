Notes:
File API is fully supported by 70% of current browser market share with an additional 22.8% worth of partial support.
FileReader API is fully supported by 88.7% of current browser market share with an additional 4.1% worth of partial support.
To match the word "is" by itself and not match any words that include the letters "is" I used /(?:^|\b)(is)(?=\b|$)/.
(?:^|\b) -> this part matches the start of the string or a word boundary
(is) -> this part matches the word "is"
(?=\b|$) -> this part matches the end of the string or a word boundary


Assumptions:
Currency and good type are the only words with first letter capitalised.
Currency is always Credits
Any alien word will always equal a single roman numeral

