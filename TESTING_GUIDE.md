# Testing Guide

## ✅ System Tests Passed!

Good news! The basic system tests are working:
- ✓ MCP communication
- ✓ Model tracking
- ✓ File structure

## 🔑 Next Step: Add Your API Key

To test the full code generation, you need an Anthropic API key.

### Getting an API Key

1. Go to: https://console.anthropic.com/
2. Sign up or log in
3. Click on "API Keys" in the left menu
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)

### Add the Key to .env

Edit the `.env` file and replace `sk-ant-your-key-here` with your actual key:

```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-ACTUAL-KEY-HERE
PORT=3000
```

## 🚀 Running the Full System

Once you have your API key configured:

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

## 🌐 Testing in Browser

1. Open: http://localhost:3000
2. You'll see the AI Coder web interface
3. Try this sample requirement:

```
Create a simple calculator class that can add, subtract, multiply,
and divide two numbers. Include error handling for division by zero.
```

4. Click "Generate Code"
5. Wait 30-60 seconds
6. You should see:
   - Generated Python code
   - Test cases (10+)
   - Model usage statistics
   - File paths where code was saved

## 🧪 Testing Generated Code

After generation, test the code:

```bash
# Run the generated code
python generated_code/generated_code_[timestamp].py

# Run the tests
python -m unittest generated_code/test_code_[timestamp].py
```

Replace `[timestamp]` with the actual timestamp from your files.

## 📊 Check Model Usage

View the tracking file:

```bash
cat model_usage.json
```

You should see something like:
```json
{
  "claude-3-5-sonnet-20241022": {
    "numApiCalls": 3,
    "totalTokens": 5200
  }
}
```

## ⚠️ Without API Key

If you don't have an API key yet:

✅ You can still:
- Run the system tests (`npm test`)
- Review all the code
- Read the documentation
- Set up the GitHub repository
- Start the server (it will show an error about missing API key)

❌ You cannot:
- Generate code
- Test the full workflow
- Create the demo video

## 🐛 Troubleshooting

**Error: "ANTHROPIC_API_KEY not found"**
- Make sure `.env` file exists
- Make sure you replaced the placeholder with your real key
- Make sure there are no extra spaces

**Error: "Port 3000 already in use"**
- Change `PORT=3001` in `.env`
- Or stop whatever is using port 3000

**Tests fail**
- Make sure you ran `npm install` first
- Check that all files are present
- Try running `npm test` again

**Generated code has errors**
- This is normal and acceptable
- As long as 8+ tests pass, you're good
- Try a simpler requirement if needed

## 📝 Testing Checklist

Before recording your demo video:

- [ ] System tests pass (`npm test`)
- [ ] Server starts without errors (`npm start`)
- [ ] UI loads at http://localhost:3000
- [ ] Can enter requirements
- [ ] Code generates successfully
- [ ] At least 10 tests are generated
- [ ] At least 8 tests pass when run
- [ ] Model usage JSON is created
- [ ] Generated code runs without crashing

## 🎥 Ready for Demo?

Once all the above works, you're ready to:
1. Record your demo video (see DEMO_VIDEO_GUIDE.md)
2. Write your report (see REPORT_TEMPLATE.md)
3. Submit your project (see SUBMISSION_CHECKLIST.md)

## 💡 Tips

- Test with multiple different requirements
- Try both simple and complex requests
- Make sure to save a good run for your demo
- Test on a fresh browser/incognito to ensure it works

Good luck! 🚀
