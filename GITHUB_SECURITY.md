# GitHub Setup & Security Guidelines

## ✅ Before Pushing to GitHub

### 1. **Verify Sensitive Files Are NOT Committed**

```bash
# Check what will be committed
git status

# These files should NOT appear in git status:
# ❌ .env
# ❌ .env.local  
# ❌ firebase-service-account.json
# ❌ backend/.env
# ❌ frontend/.env
# ✅ .env.example (safe - no secrets)
```

### 2. **Clean Up Before First Commit**

If you accidentally committed sensitive files:

```bash
# Remove from git (but keep locally)
git rm --cached .env
git rm --cached backend/.env
git rm --cached firebase-service-account.json
git rm --cached frontend/.env
git rm --cached .firebaserc

# Commit the removal
git add .gitignore
git commit -m "Remove sensitive files from tracking"
```

### 3. **Verify the .gitignore File**

Check that all sensitive patterns are included:

```bash
cat .gitignore | grep -E "\.env|firebase|credentials|keys"
```

---

## 🔒 Sensitive Files That Should Be Ignored

The following files are automatically ignored by `.gitignore`:

| File | Contains | Status |
|------|----------|--------|
| `.env` | API keys, database URLs | 🛑 NEVER COMMIT |
| `backend/.env` | Firebase credentials | 🛑 NEVER COMMIT |
| `firebase-service-account.json` | Private service account key | 🛑 NEVER COMMIT |
| `.firebaserc` | Project config | 🛑 NEVER COMMIT |
| `node_modules/` | Dependencies | 🛑 NEVER COMMIT |
| `build/` | Build output | 🛑 NEVER COMMIT |

---

## 📝 For Contributors Cloning the Repo

When someone clones your repo, they need to set up their own environment:

### **Step 1: Install Dependencies**
```bash
cd election-assistant
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### **Step 2: Create Environment Files**

Copy the example files:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend  
cp frontend/.env.example frontend/.env
```

### **Step 3: Fill in Your Secrets**

Edit each `.env` file and add your actual values:
- Firebase API keys
- Gemini API key
- Other environment-specific settings

### **Step 4: Get Firebase Service Account**

Follow these steps (not in repo):
1. Go to Firebase Console
2. Download service account JSON
3. Save as `firebase-service-account.json` (root directory only)
4. Add to `.gitignore` ✅ Already in our `.gitignore`

---

## 🚀 GitHub Best Practices

### **Commit Message Guidelines**
```bash
git commit -m "feat: Add chat functionality"
git commit -m "fix: CORS issue with deployment"
git commit -m "docs: Update README with setup instructions"
```

### **Push to GitHub**
```bash
# First time setup
git remote add origin https://github.com/yourusername/election-assistant.git
git branch -M main
git push -u origin main

# Subsequent pushes
git push origin main
```

### **Create .gitignore Before First Commit**
```bash
# Verify before adding files
git add .
git status  # Review files before committing
git commit -m "Initial commit"
```

---

## 🔍 Verify No Secrets Are Committed

```bash
# Search for common secret patterns
git log --all --full-history -- "firebase-service-account.json"
git log --all --full-history -- ".env"

# Check for API keys in commits
git grep -i "api.key\|apikey\|secret\|password" HEAD~1
```

---

## 📚 What SHOULD Be Committed

✅ **Safe to commit:**
- `.env.example` - Template showing required variables
- `.gitignore` - Ignore configuration
- Code files (`.ts`, `.tsx`, `.js`, etc.)
- Configuration templates
- Documentation (README, CONTRIBUTING, etc.)
- `package.json` (without .lock files optional)

---

## 🛡️ Additional Security Tips

1. **Never hardcode secrets** - Always use environment variables
2. **Use `.env.example`** - Show structure without secrets
3. **Review before pushing** - `git diff` before `git push`
4. **Rotate keys after leak** - If accidentally committed, rotate all keys
5. **Use GitHub Secrets** - For CI/CD pipelines
6. **Add LICENSE** - Specify usage permissions

---

## ✅ Pre-Push Checklist

- [ ] No `.env` files in git status
- [ ] No `firebase-service-account.json` in git status
- [ ] `.gitignore` properly configured
- [ ] `.env.example` files present and up-to-date
- [ ] No API keys in any code files
- [ ] No private keys in any code files
- [ ] `node_modules/` not committed
- [ ] Build folders not committed

---

## 🆘 Emergency: Leaked Secrets

If you accidentally pushed secrets:

```bash
# 1. Immediately rotate all keys
# Go to Firebase, Google Cloud, Gemini console

# 2. Remove file from history
git filter-branch --tree-filter 'rm -rf firebase-service-account.json' HEAD

# 3. Force push (be careful!)
git push origin main --force

# 4. Verify it's gone
git log --all --full-history -- "firebase-service-account.json"
```

---

**Remember: An ounce of prevention is worth a pound of cure!** 🔐
