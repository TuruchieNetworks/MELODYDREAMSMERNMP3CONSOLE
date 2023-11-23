/*
  Interview Question:
  Given a string
  return whether or not it's possible to make a palindrome out of the string's characters
  What is it about a string that makes it possible for it to be a palindrome?
  Determine whether or not it is possible for the string's characters to be
  rearranged into a palindrome.
*/

// racecar
// radar
// tacocat
// levle
// kayak

const str1 = "";
const expected1 = false;

const str2 = "a";
const expected2 = true;

const str3 = "ddaa";
const expected3 = true;
// Explanation: "daad" or "adda"

const str4 = "dda";
const expected4 = true;
// Explanation: "dad"

//                V
const str5 = "aadda";
const expected5 = true;
// Explanation: "daaad"


const str6 = "abc";
const expected6 = false;

//     v
// baabcceee

/* 
  For a string to be able to be re-ordered into a palindrome
  It must have an even occurrence of every character
  Unless it is odd length, then it can have 1 character that
  can have an odd number of occurrences.
  Another way to look at it would be, if you cancel out ever char that has a pair,
  it can be a palindrome if you are left with 0 or 1 char remaining:
    - "dad" the "d" cancels with itself to leave "a"
    - "daad" the "d" and "a" cancel with itself to leave nothing
    - "daam" the "a" cancels with itself leaving "dm", more than 1 char remaining, can't be palindrome
*/

function canBecomePalindrome(str) {
  // create a 2 array
  const arr1 =[];
  const arr2 =[];
  // loop through the string 
  for (let i =0; i< str.length; i++) {
    if (!arr1.includes(str[i])) {
      arr1.push(str[i])
    } else {
      arr2.push(str[i])
    }
  }
    arr1.toString()
    arr2.toString()
    if(arr1 === arr2) {
      return true
    } else{
      return false
    }

  // racecar
  // radar
  // tacocat
  // levle
  // kayak
    
  // initialize an empty freqCount obj  { freq: 0}
  // initialize oddCount variable
  // loop through str 
    // for each Char in str 
    // if Char exist in count,
      // count++ 
    // 
    
  // create a 2 array
  // loop through the string 
    // repopulate the aray with only 1 entry condition in the else 
        // repopulate the second aray in the else with the remainin entries
  // if arrays are equal, return true, else false 







// initialiaze empty object to store count of each char
// initialize odd count variable
// count the number of each character looping through strn
// for each char in str: (questionable)

  // if char exists in the char count, increment char count at char by 1
  //else, set char count at char to 1
// count the number of chars with odd occurances
// for each char in char count:
//if char count at char is odd, increment odd count by 1
// check to see if it's possible to rearrange into palindrome
//if str.length is even:
//if event, return odd count as 0
// elsw, one char can be odd, return odd count is 1
}

// canBecomePalindrome(str1);
// canBecomePalindrome(str2);
// canBecomePalindrome(str3);
// canBecomePalindrome(str4);
// canBecomePalindrome(str5);

console.log(canBecomePalindrome(str1) === expected1); // false
console.log(canBecomePalindrome(str2) === expected2); // true
console.log(canBecomePalindrome(str3) === expected3); // true
console.log(canBecomePalindrome(str4) === expected4); // true
console.log(canBecomePalindrome(str5) === expected5); // true