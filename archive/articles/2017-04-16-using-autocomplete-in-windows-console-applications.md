---
title: "Using Autocomplete in Windows Console Applications"
published: "2017-04-16"
platform: "CodeProject"
originalUrl: "https://www.codeproject.com/Articles/1182358/Using-Autocomplete-in-Windows-Console-Applications"
waybackUrl: "https://web.archive.org/web/20170424180513/https://www.codeproject.com/articles/1182358/"
firstCaptured: "2017-04-24"
lastCaptured: "https://web.archive.org/web/20250617133455/https://www.codeproject.com/Articles/1182358/Using-Autocomplete-in-Windows-Console-Applications"
source: "backup/codeproject/1182358-Using-Autocomplete-in-Windows-Console-Applications.html"
---

-   [Download AutoCompleteConsole\_V4.0.zip - 45.3 KB](./downloads/2017-04-16-using-autocomplete-in-windows-console-applications/autocompleteconsole_v4.0.zip)

## Introduction

`AutoCompleteConsole` is a solution that contains some tools for implementing auto complete functionality for a Windows Console Application, without losing key functions when using `Console.Readkey()`.

## Background

Recently, I was working on a project that needed a simple UI. To save time, I decided to use a Windows Console application. After implementing some simple commands, I thought it would be neat to allow the user to use autocomplete functionality (using the Tab key).

After doing some research, this turned out not to be as straightforward as I first thought. A lot of solutions offered for this problem included using the `Console.ReadKey` method. The problem with using this method is that it will disable a lot of other functions like using the arrow up/down keys to scroll through the history of typed commands. Functionality I wanted to keep.

After some more Googling, I didn’t find any solution to this problem and I decided to write my own. I want to share my solution with the community.

I’ve tried a lot of different approaches, even intercepting keys directly from the operating system. None had the desired effect.

Eventually, I decided to reverse engineer the console functionalities that are being lost by using the `ReadKey` method (on top of supporting auto complete). As I want this article to focus on the auto completion part of the problem, I've dedicated another article to the `Console.ReadKey` problem. That article can be found [here](https://www.codeproject.com/Articles/1189696/Customizing-Windows-Console-Application-Key-Action).

This article explains how to implement either one of [two types](#Implementing%20autocomplete) of autocompletion. It also explains how to combine the before mentioned solution with these implementations, as I suspect this is where the most people are having trouble. Of course, the autocompletion algorithms themselves can also be used in different circumstances. For this reason, it is implemented in a different project in the solution.

## Using the Code

The `ConsoleUtils` library (also in attached solution) provides its own `ConsoleExt.ReadKey` method which is very similar to the `Console.ReadLine` method .NET provides. The difference is that the new method leaves most key functions intact (So the up and down arrows still scroll through previous commands, etc.). It also returns a `KeyPressResult` instead of a `ConsoleKeyInfo` entity. This object doesn't only tell the programmer which key was pressed, but also contains information about the complete line and cursor position, both before and after the key press.

All properties on `KeyPressResult`:

-   `ConsoleKeyInfo` - The same `struct` that would be returned by `Console.ReadKey()`
-   `Key` - The `ConsoleKey` inside `ConsoleKeyInfo`
-   `KeyChar` - The key character inside `ConsoleKeyInfo`
-   `Modifiers` - The modifiers that were pressed when the input was given (e.g. Shift, Ctrl)
-   `LineBeforeKeyPress` - A `LineState` class containing the line information as it was before the key was pressed
-   `LineAfterKeyPress` - A `LineState` class containing the line information as it is after the key is pressed

All properties on `LineState`:

-   `Line` - The line
-   `CursorPosition` - The position of the console cursor
-   `LineBeforeCursor` - The part of the line that was before the `CursorPosition`
-   `LineAfterCursor` - The part of the line that was after the `CursorPosition`

An example of how to use `ReadKey`:

```
KeyPressResult result = ConsoleExt.ReadKey();
switch (result.Key)
{
    case ConsoleKey.Enter:
        // Use result.LineBeforeKeyPress.Line to get the same result as Console.Readline()
        break;
    case ConsoleKey.Tab:
        // Tab was pressed. Handle autocomplete here
        break;
}
```

**Note**: The example states that `LineBeforeKeyPress.Line` should be used to get the same result as `Console.Readline`. This is because after pressing the enter key, the newline is empty. So the `LineAfterKeyPress.Line` will be an empty `string`.

More information about the `ConsoleUtils` library can be found in [this article](https://www.codeproject.com/Articles/1189696/Customizing-Windows-Console-Application-Key-Action).

### Implementing Autocomplete

Even though the main problem most people are actually having (detecting a key (Tab) while retaining other console functionality) is solved with the implementation above. The article wouldn't be complete if it didn't at least provide you with the means to actually implement a basic form of autocompletion.

I found that there are two useful ways to implement autocompletion:

-   **Complimentary autocomplete** - Will look at the available commands, and gives the user an autocomplete that is shared by all commands.
-   **Cycling autocomplete** - Lets the user cycle through all options by repeatedly pressing the tab button (used in command window).

#### Complimentary Autocomplete

Implementing complimentary autocomplete is easiest, since it doesn't require the program to have a state. To implement this, the `AutoComplete.GetComplimentaryAutoComplete` method can be used for automatically completing entire sentences.

Example:

```
var commands = new List<string>
{
    "Exit",
    "The green ball.",
    "The red ball.",
    "The red block.",
    "The round ball."
};

var running = true;
while (running)
{
    var result = ConsoleExt.ReadKey();
    switch (result.Key)
    {
        case ConsoleKey.Enter:
            // ..
            break;
        case ConsoleKey.Tab:
            var autoCompletedLine = AutoComplete.GetComplimentaryAutoComplete(
		result.LineBeforeKeyPress.LineBeforeCursor, commands);
            ConsoleExt.SetLine(autoCompletedLine);
            break;
    }
}
```

Three things to note here:

-   `commands` \- This variable is a list of `String`s, containing the possible commands to autocomplete to.
-   `result.LineBeforeKeyPress` is used because we do not actually want the tab-character when looking for autocompletion.
-   `LineBeforeCursor` is used for autocompletion in this example. This means that if the user uses the left arrow to go back in his line, only the part before the cursor is used for autocompletion.
-   It is not necessary to use intercept. In the only case we get a character we don't want (tab-character), we already use `ConsoleExt.SetLine` to overwrite the entire line, including the tab.

The gif shows the result (explanation below):

![](./images/2017-04-16-using-autocomplete-in-windows-console-applications/ComplimentaryAutoComplete.gif)

When the user pressed tab after typing *"*`t`*"*, the line is autocompleted to *"*`The` *"*. When the user then types *"*`re`*"* (making it *"*`The re`*"*), and pressed tab. The line turns into *"*`The red b`*"*. Only after providing the *"*`l`*"* can the system autocomplete to *"*`The red block.`*"*.

In the example is also shown how the user decides to go back in the line to type a *"*`g`*"*. Because the code uses `LineBeforeCursor`, it is now only using *"*`The g`*"* for autocompletion. Turning the line into *"*`The green ball.`*"*.

#### Cycling Autocomplete

For implementing cycling autocompletion, the `CyclingAutoComplete` class is provided.

Example:

```
var commands = new List<string>
{
    "Exit",
    "The green ball.",
    "The red ball.",
    "The red block.",
    "The round ball."
};

var running = true;
var cyclingAutoComplete = new CyclingAutoComplete();
while (running)
{
    var result = ConsoleExt.ReadKey();
    switch (result.Key)
    {
        case ConsoleKey.Enter:
            // ..
            break;
        case ConsoleKey.Tab:
            var autoCompletedLine = cyclingAutoComplete.AutoComplete(
		result.LineBeforeKeyPress.LineBeforeCursor, commands);
            ConsoleExt.SetLine(autoCompletedLine);
            break;
    }
}
```

Result:

![](./images/2017-04-16-using-autocomplete-in-windows-console-applications/CyclingAutoComplete.gif)

When the user pressed tab after typing *"*`T`*"*, the line is autocompleted to *"*`The green ball.`*"*. When the user then pressed tab again, the line turns into *"*`The red ball.`*"*. The lines will keep cycling every time tab is pressed.

When the user then moves the cursor back to after *"*`red`*"*, the cycle changes to only contain *"*`The red ball.`*"* and *"*`The red block.`*"*. Again because we used `LineBeforeCursor` here.

##### Cycling Both Directions

In most consoles, the user can cycle back using the combination Shift+Tab. The `CyclingAutoComplete` class already supports this using the `CyclingDirections` parameter. It can be easily achieved by altering the code a bit:

```
case ConsoleKey.Tab:
    var shiftPressed = (result.Modifiers & ConsoleModifiers.Shift) != 0;
    var cyclingDirection = shiftPressed ? CyclingDirections.Backward : CyclingDirections.Forward;
    var autoCompletedLine = cyclingAutoComplete.AutoComplete(
	result.LineBeforeKeyPress.LineBeforeCursor,
        commands, cyclingDirection);
    ConsoleExt.SetLine(autoCompletedLine);
    break;
```

All examples are present in the attached solution.

## Points of Interest

Even though this article references [this article](https://www.codeproject.com/Articles/1189696/Customizing-Windows-Console-Application-Key-Action) because I think it is applicable to most people looking to implement auto completion in a console, the algorithms explained in this article can easily be used without it. It is for that reason that both implementations have their separate project in the attached solution.

I haven’t implemented all default console functionality. If you have any good additions, feel free to message me, and I might add them to the project.

All methods that can be used for autocompletion have an optional `ignoreCase` parameter. Default is `true`.

## History

##### 16-04-2017 - Version 1

##### 17-04-2017 - Version 2

-   Extended `InputResult` with cursor position and modifiers
-   Added `CyclingDirections` to the library, allowing the user to cycle both directions
-   Simplified the examples
-   Uploaded gifs for illustration

##### 27-04-2017 - Version 3

-   Made the entire library more generic. Where `ConsoleExt` used to have knowledge about autocompletion, it is now entirely separate from this logic. It is now also a separate library.
-   Added `ReadLine`, `SimulateKeyPress`, `SetLine`, `ClearLine`, `StartNewLine` and `PrependLine` to `ConsoleExt`
-   Changed `InputResult` in `KeyPressResult` and extracted `LineState` class
-   Made `ConsoleExt` thread safe

##### 29-04-2017 - Version 3.1

-   Prevent normal use of tab key to cause undefined behaviour.
-   Solved bug in `PrependLine` when prepending multiline strings.

##### 11-06-2017 - Version 4.0

-   Explained the separation between the `ConsoleExt.ReadKey` and Autocompletion algorithms clearer.
-   Refactored `ConsoleExt` to allow for a lot more unit testing and implemented those unit tests.
