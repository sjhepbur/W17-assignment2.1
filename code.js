function getStats(txt) {

    //All variables needed
    let num_of_chars = getNumChars(txt);
    let num_of_words = getNumWords(txt);
    let num_of_lines = getNumLines(txt);
    let num_nonEmpty_lines = getNonEmpty(txt);
    let max_line_len = getMaxLineLen(txt);
    let avg_word_len = getAvgLen(txt);
    let txt_palindromes = getPalindromes(txt);
    let longest_words = getLongestWords(txt);
    let freq_words = getFreqWords(txt);

    return {
        nChars: num_of_chars,
        nWords: num_of_words,
        nLines: num_of_lines,
        nNonEmptyLines: num_nonEmpty_lines,
        maxLineLength: max_line_len,
        averageWordLength: avg_word_len,
        palindromes: txt_palindromes,
        longestWords: longest_words,
        mostFrequentWords: freq_words
    };
}

//Function that gets all words in a string and returns it as an array of words
function getWords(txt){
    let wordsArr = txt.split(/[^A-Za-z0-9]/g);

    //Removes all empty spaces in the array
    wordsArr = wordsArr.filter(function(x){
        return (x !== (undefined || null || ''));
    });
    return wordsArr;
}

//Function that gets all lines in a string and returns it as an array of lines
function getLines(txt){
    return txt.split(/\r\n|\r|\n/);
}

//Function that gets the number of characters in a string
function getNumChars(txt){
    return txt.length
}

//Function that gets the number of words contained in a string
function getNumWords(txt){
    let wordsArr = getWords(txt);
    let wordsCount = 0;
    for (let i = 0; i < wordsArr.length; i++){
        wordsCount++;
    }
    return wordsCount;
}

//Function that gets the number of lines in a string
function getNumLines(txt){
    lines = getLines(txt);
    return lines.length;
}

//Function that gets the number of all non-empty lines in a string
function getNonEmpty(txt){
    let lines = getLines(txt);
    let nonEmptyLines = 0;
    for (let i = 0; i < lines.length; i++){

        //Check to see if the line is empty
        if (/\S/.test(lines[i])){
            nonEmptyLines++;
        }
    }
    return nonEmptyLines;
}

//Function that gets the average length of all words in a string
function getAvgLen(txt){
    let wordsArr = getWords(txt);
    let wordsCount = 0;
    let wordsTotal = 0;
    for (let i = 0; i < wordsArr.length; i++){
        wordsCount++;
        wordsTotal += wordsArr[i].length;
    }
    wordsAvg = wordsTotal/wordsCount;
    return wordsAvg;
}

//Function that gets the maximum length of all lines in a string
function getMaxLineLen(txt){
    lines = getLines(txt);
    max_line_len = 0;
    for (let i = 0; i < lines.length; i++){
        cur_line_len = getNumChars(lines[i]);
        if (cur_line_len > max_line_len){
            max_line_len = cur_line_len;
        }
    }
    return max_line_len;
}

//Function that returns a list of all palindromes from a string
function getPalindromes(txt){
    let wordsArr = getWords(txt);
    let palindromes = [];
    for (let i = 0; i < wordsArr.length; i++){
        word = wordsArr[i].toLowerCase();
        if (isPalindrome(word) && word.length >= 3 && !inArray(palindromes, word)){
            palindromes.push(word);
        }
    }
    return palindromes;
}

//Function that checks if a word is a palindrome
function isPalindrome(word){
    return word == word.split('').reverse().join('');
}

//Function that gets a list of the 10 longest words in a string
function getLongestWords(txt){
    wordsArr = getWords(txt);
    longest_words = [];
    for (let i = 0; i < wordsArr.length; i++){
        word = wordsArr[i].toLowerCase();
        if ((longest_words.length == 0 || longest_words.length < 10) && !inArray(longest_words, word)){
            longest_words.push(word);
            longest_words = sortLongestArray(longest_words);
        }
        else{
            if (wordsArr[i].length >= longest_words[longest_words.length - 1].length && !inArray(longest_words, word)){
                // longest_words.splice(-1,1);
                longest_words.push(word);
                longest_words = sortLongestArray(longest_words);
                longest_words.splice(-1,1);
            }
        }
    }
    return longest_words;
}

//Function that checks if a word is in an array
function inArray(array, word){
    return array.indexOf(word) > -1;
}

//Function that sorts an array from longest to shortest word. Sorts tied length words alphabetically
function sortLongestArray(longest_words){
    return longest_words.sort(function(a,b){
        return b.length - a.length || a.localeCompare(b);
    });
}

//Function that gets a list of the 10 most frequent words as well as the number of times the occur in a string
function getFreqWords(txt){
    wordsArr = getWords(txt);
    let frequency = {};
    for(let i = 0; i < wordsArr.length; i++){
        word = wordsArr[i].toLowerCase();
        if(word in frequency){
            frequency[word]++;
        }
        else{
            frequency[word] = 1;
        }
    }

    let unique_words = [];
    for (word in frequency){
        unique_words.push(word);
    }

    let unique_words_sorted = unique_words.sort(function(a,b){
        return frequency[b] - frequency[a] || a.localeCompare(b);
    });

    top_ten = [];
    for (let i = 0; i < 10; i++){
        word = unique_words_sorted[i];
        value = word + "(" + frequency[word] + ")";
        top_ten.push(value);
        if(top_ten.length == 10 || i == unique_words_sorted.length - 1){
            break;
        }
    }
    return top_ten;
}