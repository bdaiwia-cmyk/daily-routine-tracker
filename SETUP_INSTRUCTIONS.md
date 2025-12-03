# Quick Setup Instructions

Follow these steps to get the AI Coder system running:

## Step 1: Install Dependencies

Open a terminal in this directory and run:

```bash
npm install
```

This will install all required Node.js packages.

## Step 2: Get an Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it looks like: sk-ant-...)

## Step 3: Configure Environment

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   PORT=3000
   ```

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
==================================================
AI Coder - Multi-Agent Code Generator
==================================================
Server running on http://localhost:3000
Open your browser and navigate to the URL above
==================================================
```

## Step 5: Open in Browser

Go to: http://localhost:3000

## Step 6: Test the System

1. Choose a sample requirement from `SAMPLE_REQUIREMENTS.txt` or write your own
2. Paste it into the text area
3. Click "Generate Code"
4. Wait 30-60 seconds for generation
5. View the generated code, tests, and usage statistics

## Step 7: Run Generated Code

After generation, you'll see file paths like:
- `generated_code/generated_code_1234567890.py`
- `generated_code/test_code_1234567890.py`

Run the code:
```bash
python generated_code/generated_code_1234567890.py
```

Run the tests:
```bash
python -m unittest generated_code/test_code_1234567890.py
```

(Replace the timestamp numbers with your actual file names)

## Troubleshooting

**Problem:** "ANTHROPIC_API_KEY not found"
**Solution:** Make sure you created the `.env` file and added your API key

**Problem:** "Port 3000 already in use"
**Solution:** Change PORT in `.env` to a different number like 3001

**Problem:** "Module not found"
**Solution:** Run `npm install` again

**Problem:** Generated code has errors
**Solution:** This is expected - the code should mostly work but may have minor bugs

## What to Submit

For your project submission, you need:

1. **ZIP file** - Download your GitHub repository as ZIP
2. **Demo video** - Record yourself using the system (MP4 format)
3. **Written report** - Use `REPORT_TEMPLATE.md` as a starting point, export as PDF
4. **Peer evaluation** - Fill out the form provided on Canvas

## Important Notes

- Make sure all group members commit to the GitHub repository
- Add comments with your name and student ID at the top of each file
- Test the system multiple times before recording your demo
- Make sure at least 8 out of 10 tests pass in your demo
