# Handle Transmissions

## Goals

Understand Overlap and Inconsistency Mechanisms:

- Comprehend the guaranteed overlap between segments.
- Grasp the nature of transcription inconsistencies.

Overlap Detection:

- Create a function to identify the overlapping region between two segments, considering guaranteed overlap.

Resolving Inconsistencies:

- Implement a strategy for applying majority rules to resolve inconsistencies in overlapping regions.
  Building the Final Transcript:
- Merge segments iteratively, applying overlap detection and inconsistency resolution at each step.
  Handling Special Cases:
- Ensure your solution can handle cases like repeated or missing words within overlaps.

Expected outcome: `" I don't want to take away from the truth! That's fine. But I needed to hear this";`

```
const testStrings = [
" I don't want to take it.",
" I don't want to take...",
" I don't want to take away.",
" I don't want to take away",
" I don't want to take away from",
" I don't want to take away from",
" I don't want to take away from the",
" I don't want to take away from the",
" I don't want to take away from the truth!",
" to take away from the truth, that's fine, but...",
" and take away from the truth! That's fine. But I needed... ",
" away from the truth! That's fine. But I needed to hear this.",
];
```

## Implementation

### Handle Transmission

The algorithm to complete this process relies on 2 variables and 3 functions. `currentTranscript` is the state of the transmission upon each iteration. `counts` is the mechanism by which majority rule is established. It maintains a log of the frequency of each word at a given index in the transmission.

`detectOverlap` finds the overlap between `currentTranscript` and the current test string and merges them preserving the state before the overlap. `resolveInconsistencies` takes the `currentTranscript` and adds the values to `counts`. Finally, `counts` is passed into `buildTranscript` which uses the majority rule to create a final transcript.

### Detect Overlap

First, the beginning of the overlap is identified. The index of the beginning of the overlap is stored as `start`. Next, the total overlap is searched for from `start` by appending the next word in the current test string to a temporary value. As long as `currentTranscript` contains temp the check continues. Once the check fails, the most recent truthy temp value is assumed to be the correct overlap. Assuming guaranteed overlap, the words before `start` are ignored resolving inconsistencies at the head of test strings.

Finally, The beginning of `currentTranscript` is preserved, the new transmission is appended to `currentTranscript` and the merged string is returned. I decided to manage a `currentTranscript` rather than simply return the overlap because it made adding to the majority rule counter simple. Had I returned only the overlapping portion it seemed like I would have also needed to return starting/finishing indexes to the counter. This seems error prone.

### Resolve Inconsistency

I built a mechanism for majority rule using a hash map. The keys are the location of a given word in the transcript. The values are an array of key/value pairs. These key/value pairs indicate the frequency of a given word at a location in the transmission.
`currentTranscript` is passed in along with `counts` (the current state of the majority rule mechanism). `currentTranscript` is converted into an array.

For each element in the array: If `counts` does not have a key of that value, one is added and a k/v pair is added to indicate that the given word has now been observed 1 time. If `counts` does have a key equal to the current index of the array, then the values are searched to see if the word has already been observed in a previous transmission. If it has, the value associated with that word is incremented. If it has not a new k/v pair is added to the array to indicate that the given word has now been observed 1 time. Whether a k/v should be added or a value incremented is handle by the presence of the `updated` var. If `counts` includes a given index and it's k/v pairs have been searched and an update has not taken place, it is safe to assume that the word needs to be accounted for as a new value.

An updated version of `counts` is returned.

### Build Final Transcript

Finally, the transcript is built. `counts` is passed into the function. Here is where the majority rule mechanism is applied. Assuming a) each transmission overlapped with the one before it, b) the overlaps were detected correctly and c) `resolveInconsistencies` assigned values to the correct index, the number of keys in `counts` will be the same as the length of the expected output.

The function builds a final `transcript`. Searching the array stored in each key `buildTranscript` appends to the final transcript the most frequently observed word. In the event of a tie it is assumed that the most recent value is preferred.

**The final result is the expected output indictated for the provided array.**
