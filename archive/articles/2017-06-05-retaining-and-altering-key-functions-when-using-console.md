---
title: "Retaining (and altering) key functions when using Console.ReadKey()"
published: "2017-06-05"
platform: "CodeProject"
originalUrl: "https://www.codeproject.com/Articles/1189696/Retaining-and-altering-key-functions-when-using-Co"
waybackUrl: "https://web.archive.org/web/20170605214131/https://www.codeproject.com/Articles/1189696/Customizing-Windows-Console-Application-Key-Action"
firstCaptured: "2017-06-05"
lastCaptured: "https://web.archive.org/web/20250517042438/https://www.codeproject.com/Articles/1189696/Retaining-and-altering-key-functions-when-using-Co"
source: "backup/codeproject/1189696-Retaining-and-altering-key-functions-when-using-Co.html"
---

-   [Download ReadKeyConsole.zip - 39.7 KB](./downloads/2017-06-05-retaining-and-altering-key-functions-when-using-console/readkeyconsole.zip)

## Introduction

`ReadKeyConsole` is a solution that provides a way of retaining key functions when using `Console.ReadKey()`, overriding those functions, and some other useful console functionalities.

## Background

When working on a console application, I wanted to implement a custom action when the *tab key* was pressed. 

After doing some research, this turned out not to be as straightforward as I first thought. A lot of solutions offered for this problem included using the `Console.ReadKey` method. The problem with using this method is that it will disable a lot of other functionality like using the *arrow up/down keys* to scroll through the history of typed commands. Functionality I wanted to keep.

The example below illustrates this:

```
bool running = true;
string line = string.Empty;
while (running)
{
    var key = Console.ReadKey();
    if (key.Key == ConsoleKey.Enter)
    {
        if (line.ToLower() == "exit")
            running = false;
        Console.WriteLine(line);
        line = string.Empty;
    }
    else
        line += key.KeyChar;
}
```

**Note:** I already took time to fix the enter key functionality in this example, as the default behaviour will just return the cursor to its first position again, without starting a new line.

When I press the *up key* on the second line, the application inserts a space instead of my previous typed command ("Test"). Then, when I press escape (twice) to clear the line, it just shows a *"?"*, meaning it is writing down the character instead:

![](./images/2017-06-05-retaining-and-altering-key-functions-when-using-console/ReadKeyProblem.gif)

Obviously, when I want to implement functionality for a single key, I do not want the other functions that the console has to offer to be lost.

After some more Googling, I didn’t find any solution to this problem and I decided to write my own. I want to share my solution with the community.

I’ve tried a lot of different approaches, even intercepting keys directly from the operating system. None had the desired effect.

Eventually, I decided to reverse engineer the console functions that are being lost by using the `ReadKey` method. I’m not sure if the benefits outweigh the cost. But it was a nice project to work on and a good learning experience.

## Default Console Key Functions

Before I started, I had to figure out what default functions were supported for a console application. Again, Google offered less help than I had hoped. I found quite a few pages explaining different functions, but none of them were complete.

By combining the information on these pages, and by actually trying it myself, I decided to support the following functions:

### Key combinations without Ctrl button pressed

<table border="1" cellpadding="1" cellspacing="1" style="width: 600px"><tbody><tr><td style="width: 120px">Default</td><td>Insert character</td></tr><tr><td>F1</td><td>Auto complete a single character from the previously entered entry</td></tr><tr><td>F3</td><td>Auto complete the rest of the line using the selected previous entry</td></tr><tr><td>F5</td><td>Cycle up through previous entries</td></tr><tr><td>F6</td><td>Do nothing</td></tr><tr><td>F8</td><td>Auto complete using previous entries</td></tr><tr><td>Escape</td><td>Clear line</td></tr><tr><td>Delete</td><td>Remove succeeding character</td></tr><tr><td>Backspace</td><td>Remove preceding character</td></tr><tr><td>Left arrow</td><td>Move cursor left</td></tr><tr><td>Right arrow</td><td>Move cursor right</td></tr><tr><td>Home</td><td>Move cursor to start of line</td></tr><tr><td>End</td><td>Move cursor to end of line</td></tr><tr><td>Up arrow</td><td>Cycle up through previous entries</td></tr><tr><td>Page up</td><td>Cycle to first entry</td></tr><tr><td>Down arrow</td><td>Cycle down through previous entries</td></tr><tr><td>Page down</td><td>Cycle to last entry</td></tr></tbody></table>

### Key combination with Ctrl button pressed

<table border="1" cellpadding="1" cellspacing="1" style="width: 600px"><tbody><tr><td style="width: 120px">Default</td><td>Do nothing</td></tr><tr><td>H</td><td>Remove preceding character</td></tr><tr><td>Backspace</td><td>Remove all preceding characters</td></tr><tr><td>Left arrow</td><td>Move cursor to start of line</td></tr><tr><td>Right arrow</td><td>Move cursor to end of line</td></tr><tr><td>Home</td><td>Remove all preceding characters</td></tr><tr><td>End</td><td>Remove all succeeding characters</td></tr></tbody></table>

**Note:** As stated, this list is not complete. Some functions had too little benefit for their cost (e.g. F2 and F4 open a menu to enable functionality) while others I might have simply missed. But as you will see in the [next chapters](#Custom%20Console%20Actions): This solution will make it very easy to add any functionality you might find missing. And even override the default functionality as is displayed in these tables.

## Using the code

[The library (attached)](#Source) provides its own `ConsoleExt.ReadKey` method which is very similar to the `Console.ReadLine` method .NET provides. The difference is that the new method leaves most key functions intact (So the *up and down arrows* still scroll through previous commands, etc. See chapter [Default Console Key F](#Default%20Console%20Key%20Functionality)[unctions](#Default%20Console%20Key%20Functionality)). It also returns a `KeyPressResult` instead of a `ConsoleKeyInfo` entity. This object doesn't only tell the programmer which key was pressed, but also contains information about the complete line and cursor position, both before and after the key press.

All properties on `KeyPressResult`:

-   `ConsoleKeyInfo` - The same `struct` that would be returned by `Console.ReadKey()`.
-   `Key` - The `ConsoleKey` inside `ConsoleKeyInfo`.
-   `KeyChar` - The key character inside `ConsoleKeyInfo`.
-   `Modifiers` - The modifiers that were pressed when the input was given (e.g. Shift, Ctrl).
-   `LineBeforeKeyPress` - A `LineState` class containing the line information as it was before the key was pressed.
-   `LineAfterKeyPress` - A `LineState` class containing the line information as it is after the key is pressed.

All properties on `LineState`:

-   `Line` - The line.
-   `CursorPosition` - The position of the console cursor.
-   `LineBeforeCursor` - The part of the line that was before the `CursorPosition`.
-   `LineAfterCursor` - The part of the line that was after the `CursorPosition`.

An example of how to use `ReadKey`:

```
bool running = true;
while (running)
{
    var result = ConsoleExt.ReadKey();
    if (result.Key == ConsoleKey.Enter && result.LineBeforeKeyPress.Line.ToLower() == "exit")
        running = false;
}
```

By using ConsoleExt.ReadKey, default functions will be retained. The following gif shows the exact same key combination as the example in chapter [background](#Background) (*up key* followed by *escape key*). Now with the expected behaviour:

![](./images/2017-06-05-retaining-and-altering-key-functions-when-using-console/ReadKeySolution.gif)

**Note**: The example states that `LineBeforeKeyPress.Line` should be used to get the same result as `Console.Readline`. This is because after pressing the *enter key*, the newline is empty. So the `LineAfterKeyPress.Line` will be an empty `string`.

In some cases, it might be useful to intercept the key that is pressed. Both .NET and this library support this, by providing the `intercept` parameter in the `ReadKey` method.

A useful addition to the standard console functionality, is that the programmer can now simulate key presses using the `SimulateKeyPress` method. This makes it possible to use an intercepted key after examination, or to even provide keys the user did not enter.

In the example below, we want to intercept the space key for some reason. This can easily be achieved by using the intercept and `SimulateKeyPress` functionality.

```
KeyPressResult result = ConsoleExt.ReadKey(true);
switch (result.Key)
{
    case ConsoleKey.Enter:
        ConsoleExt.SimulateKeyPress(result.ConsoleKeyInfo);
	    // Extra logic for return. E.g. check for a command.
        break;
    case ConsoleKey.Spacebar:
	    // Handle space, without it being entered in console, 
	    // as we intercept and do not simulate.
        break;
    default:
	    // In all other cases, call SimulateKeyPress.
        ConsoleExt.SimulateKeyPress(result.ConsoleKeyInfo);
        break;
    }
}
```

**Note**: When using the intercept parameter, `LineAfterKeyPressed` will contain the same information as `LineBeforeKeyPressed`, as nothing changes in the console.

All `public` properties/methods available on `ConsoleExt`:

-   `LineState` - Property returning the current line/cursor state

-   `ReadLine` - Method that behaves the same as `Console.Readline`. However, for some other methods to work, this method must be used instead of `Console.Readline`. These methods are marked using an asterisk(\*).
-   `ReadKey` - Method that blocks until one key is pressed by the user. Possible to intercept the key from the Console.
-   `SimulateKeyPress` - Method to simulate a key press from the user
-   `SetLine` - Method to set the current line. Will overwrite any characters the user already typed.\*
-   `ClearLine` - Will clear the current line. All characters already typed by the user are deleted.\*
-   `StartNewLine` - Will start a new line. Like when enter is typed.\*
-   `PrependLine` - Will prepend a line above the one the user is currently using.\* This can be useful for multithreaded console applications. *(I will write an article about that subject shortly)*
-   *Custom Console Methods* - These will be addressed in the [next chapter](#Custom%20Console%20Actions).

\* These methods will not work if `Console.ReadLine/ReadKey` are used instead of `ConsoleExt.ReadLine/ReadKey`.

### Custom Console Actions

Custom console actions can be used to alter default console key behaviour. For example, the console action that is attached to the *home key* by default, will set the cursor the first position of the line. ConsoleExt provides the means to override this default behaviour or to create new behaviour altogether.

When assigning a custom console action, modifier key (shift, ctrl and alt) combinations are combined with the action key. For a single key, all different modifier combinations can have a different console action. This keeps the library as flexible as possible.

For example: *ctrl + a* could mean select all, while *ctrl + alt + a* could have another function altogether.

Below is a list of these combinations:

-   No modifier keys
-   Control
-   Shift
-   Alt
-   Shift + Alt
-   Control + Shift
-   Control + Alt
-   Control + Shift + Alt

For this to be easy to use, all console action related methods have several variants:

-   One to affect the console action for all modifier combinations (including *No modifier keys*).
-   One to affect all combinations without the control key (*No modifier keys, Shift, Alt and Shift + Alt*).
-   One to affect all combinations with the control key (*Control, Control + Shift, Control + Alt and Control + Shift + Alt*).
-   And a method to affect the action of a single modifier key combination.

Every modifier combination also has a default action assigned to it. This is the action that will be used if no action is assigned to a specific key. As shown in the first row of each table in the chapter [default console key f](#Default%20Console%20Key%20Functionality)[unctions](#Default%20Console%20Key%20Functionality), the default for non-control combinations is to write the character in the control and the default for control combinations is to do nothing. The library also allows for the defaults to be overridden.

`ConsoleExt` supports the following functionality for console actions:

-   Setting a console action
-   Removing a console action
-   Setting a default console action
-   Resetting all console behaviour

Combining these functions with the modifier variants as stated above gives the following list of console action methods implemented by `ConsoleExt`:

-   `SetConsoleAction` - Assign a console action to one specific key + modifier combination.
-   `SetConsoleActionForNonCtrlModifierCombinations` - Assign a console action to one specific key + all non ctrl modifier combinations.
-   `SetConsoleActionForCtrlModifierCombinations` - Assign a console action to one specific key + all ctrl modifier combinations.
-   `SetConsoleActionForAllModifierCombinations` - Assign a console action to one specific key + all modifier combinations.
-   `RemoveConsoleAction` - Remove a console action from one specific key + modifier combination.
-   `RemoveConsoleActionForNonCtrlModifierCombinations` - Remove a console action from one specific key + all non ctrl modifier combinations.
-   `RemoveConsoleActionForCtrlModifierCombinations` - Remove a console action from one specific key + all ctrl modifier combinations.
-   `RemoveConsoleActionForAllModifierCombinations` - Remove a console action from one specific key + all modifier combinations.
-   `SetDefaultConsoleAction` - Set a default console action for a specific modifier.
-   `SetDefaultConsoleActionForNonCtrlModifierCombinations` - Set a default console action for all non ctrl modifier combinations.
-   `SetDefaultConsoleActionForCtrlModifierCombinations` - Set a default console action for all ctrl modifier combinations.
-   `SetDefaultConsoleActionForAllModifierCombinations` - Set a default console action for all modifier combinations.
-   `ResetConsoleBehaviour` - Reset all assigned console actions.

Creating a custom console action is very straightforward. It requires your class to implement `IConsoleAction`, after which it can be passed to ConsoleExt using one of the methods above.

In the following example we want the tab key to repeat the previous character in the line.

First we implement the console action class:

```
public class RepeatPreviousCharacterAction : IConsoleAction
{
    public void Execute(IConsole console, ConsoleKeyInfo consoleKeyInfo)
    {
        if (console.CursorPosition <= 0)
            return;
        var previousChar = console.CurrentLine[console.CursorPosition - 1].ToString();
        console.CurrentLine = console.CurrentLine.Insert(console.CursorPosition, previousChar);
        console.CursorPosition += 1;
    }
}
```

If the cursor is on the first position, the action does nothing. In other cases, it will get the character in front of the cursor, and inserts it at the position of the cursor. After this, we move the cursor one position to the right.

Now all we have to do, it assign this action to the correct key, in this case the *tab*.

```
ConsoleExt.SetConsoleActionForNonCtrlModifierCombinations(
    ConsoleKey.Tab, new RepeatPreviousCharacterAction());
```

That's it. When the user of the application presses the tab key without holding the control button, the previous character will be inserted again:

![](./images/2017-06-05-retaining-and-altering-key-functions-when-using-console/CustomConsoleKeyImplementation.gif)

**Note:** Because we used the Non-Control variant of the method, the console action is automatically assigned for *Tab, Shift + Tab, Alt + Tab and Shift + Alt + Tab.*

An example of assigning the console action only for *Shift + Alt + Tab* would be:

```
ConsoleExt.SetConsoleAction(
    ConsoleModifiers.Shift | ConsoleModifiers.Alt, 
    ConsoleKey.Tab, new RepeatPreviousCharacterAction());
```

## Design Choices

This chapter will explain a few of the design choices I made when creating the library. For context, it is good to have [the source](#Source) open while reading this.

### Previous Line Buffer

A big part of the default key functions is the use of previous entries. Examples of this are using the *up and down keys* to scroll through these previous entries and using function keys for autocompletion using these enties.

Since this functionality contains state (the entries and the index of an entry) which is used over all functions, I decided to create a separate class for this. The `PreviousLineBuffer`.

The use of a separate class also enables easy unit testing and keeps the `ConsoleExt` class cleaner.

### Console Actions

To make testing easier, and to make `IConsoleAction` more generic, I wanted the console to be passed to the interface, instead of all implementations having to use `ConsoleExt` directly. To accomplish this, `IConsole` is used.

Because `ConsoleExt` is static and cannot implement an interface directly, a wrapper class (`ConsoleExtInstance`) was created in order for `ConsoleExt` to pass itself into the console action classes.

The use of `IConsole` also makes unit testing easier, as the programmer can now make a stub class instead of having to use the actual `ConsoleExt`. The [attached solution](#Source) also contains examples of this (`ConsoleStub`).

## Points of Interest

As stated in the chapter [default console key functions](#Default%20Console%20Key%20Functionality), I haven’t implemented all functionality. If you have any good additions, feel free to message me, and I might add them to the project.

Keys like tab are not yet supported in this version of the library. Currently, the library is designed to have one screen character for one line character, while the tab key represents one line character for several screen characters.

Little disclaimer for the purists: Yes, it would have been better to mock (or even stub) `PreviousLineBuffer` in tests like `CycleDownActionTests`, but I didn't want to use a mocking framework for an isolated library like this, or complicate things in another way. So yes, `CycleDownActionTests` (and tests like it) also test a bit of the code that is already tested in `PreviousLineBufferTests`.

To make methods like `ReadLine` predictable, I've chosen to always let the *enter key* be the new line key, and not use a console action for this. Of course it is very easy to alter this in the `ConsoleExt` class yourself.

## History

##### 05-06-2017 - Version 1
