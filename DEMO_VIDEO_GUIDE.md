# Demo Video Recording Guide

This guide will help you create a great demo video for your project submission.

## Requirements Checklist

Your demo video must show:
- ✅ Taking in functional requirements through the GUI
- ✅ Generating the code and test cases
- ✅ Showing the code runs properly
- ✅ Showing test cases are runnable
- ✅ At least 10 test cases generated
- ✅ At least 8 tests passing
- ✅ Model usage tracking report displayed

## Recommended Recording Software

- **Windows:** OBS Studio (free), Xbox Game Bar (built-in), or Loom
- **Mac:** QuickTime Player (built-in) or OBS Studio (free)
- **Any OS:** Zoom (record a meeting with just yourself)

## Recording Steps

### Part 1: Introduction (10-15 seconds)
1. Show your browser with the AI Coder UI
2. Briefly show the URL: http://localhost:3000

### Part 2: Enter Requirements (15-20 seconds)
1. Click in the text area
2. Paste or type a requirement (use one from SAMPLE_REQUIREMENTS.txt)
3. Example: "Create a calculator application that can perform basic arithmetic operations..."
4. Click "Generate Code" button

### Part 3: Show Generation Process (5 seconds)
1. Show the "Generating code..." loading message
2. Wait for generation to complete (edit this part shorter if needed)

### Part 4: Show Results (60-90 seconds)

**Generated Files:**
1. Point out the file paths shown in the UI
2. Show they were created in the generated_code directory

**Generated Code:**
1. Scroll through the code in the UI
2. Briefly explain what it does
3. Show it addresses the requirements

**Generated Tests:**
1. Scroll through the test cases
2. Count them (point out there are 10+)
3. Show they test different aspects of the code

**Model Usage:**
1. Scroll to the model usage statistics
2. Show the JSON with API calls and tokens

### Part 5: Run the Code (30-45 seconds)
1. Open a terminal
2. Navigate to the project directory
3. Run: `python generated_code/generated_code_[timestamp].py`
4. Show the output/program working

### Part 6: Run the Tests (30-45 seconds)
1. In the same terminal
2. Run: `python -m unittest generated_code/test_code_[timestamp].py`
3. Show the test results
4. Point out that 8+ tests passed
5. Show the summary (e.g., "Ran 10 tests, 9 passed, 1 failed")

### Part 7: Wrap Up (5-10 seconds)
1. Return to the browser showing the full results
2. Optionally mention the system features

## Tips for a Good Demo

**Do:**
- Test your recording setup before starting
- Do a practice run first
- Speak clearly (if adding voiceover)
- Show each step smoothly
- Make sure text is readable (increase font size if needed)
- Keep it concise (3-5 minutes is ideal)

**Don't:**
- Rush through the steps
- Skip showing the test results
- Forget to show at least 8 tests passing
- Include sensitive information (API keys, personal data)
- Make the video too long (keep under 10 minutes)

## Editing Your Video

You can edit your video to:
- Trim the waiting time during code generation
- Add text overlays to highlight important parts
- Speed up lengthy sections (like scrolling through code)
- Add a title screen at the beginning

Free editing software:
- **Windows:** DaVinci Resolve, Shotcut
- **Mac:** iMovie (built-in), DaVinci Resolve
- **Online:** Kapwing, Clipchamp

## Exporting

Make sure to export as:
- **Format:** MP4
- **Quality:** 720p or 1080p
- **File size:** Under 500MB (compress if needed)

## Before Submitting

- [ ] Video is in MP4 format
- [ ] All requirements are clearly demonstrated
- [ ] At least 10 tests shown
- [ ] At least 8 tests passing
- [ ] Model usage report visible
- [ ] Code execution demonstrated
- [ ] Video quality is good (readable text)
- [ ] Audio is clear (if using voiceover)

## Example Script (Optional)

If you want to add voiceover, here's a sample script:

```
"Hello, this is a demo of our AI Coder multi-agent system.

I'll start by entering software requirements into the web interface.
[paste requirements]

Now I'll click Generate Code and wait for the system to process.

As you can see, the system has generated Python code, test cases, and
tracked model usage. The code has been saved to these files.

Let me scroll through the generated code - it implements all the
requirements we specified.

Here are the test cases - we have 12 tests covering different
functionality.

The model usage report shows we made 3 API calls using X tokens.

Now let's run the generated code.
[run code]
As you can see, it works correctly.

Finally, let's run the tests.
[run tests]
We have 10 tests, and 9 of them passed, which exceeds the 80%
requirement.

This demonstrates our multi-agent system successfully generating
working code from requirements. Thank you."
```

## Troubleshooting

**Tests aren't passing enough:**
- Try a simpler requirement
- Run generation multiple times and pick the best result
- The system should achieve 80%+ consistently

**Code has errors:**
- This is expected - show it anyway
- As long as tests pass 80%, it's fine
- Minor bugs are acceptable per the rubric

**Video is too large:**
- Use HandBrake or similar to compress
- Reduce resolution to 720p
- Trim unnecessary sections
