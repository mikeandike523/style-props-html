set -e

echo "Disabling automatic CRLF -- LF conversion..."
git config core.autocrlf false

echo "Forcing git to normalize to LF on checkout and commit..."
git config core.eol lf

echo "enabling safe-CRLF checking (will refuse commits with mixed line endings)"
git config core.safecrlf true

echo "Removing .venv (if exists)..."
rm -rf .venv

echo "Removing node_modules (if exists)..."
rm -rf node_modules

echo "Creating python virtual environment (.venv)..."
python -m venv .venv

echo "Installing pipenv..."

# if on windows, source .venv/Scripts/activate, on linux or mac use .venv/bin/activate
if [ "$(uname)" == "Darwin" ] || [ "$(uname)" == "Linux" ]; then
    source .venv/bin/activate
else
    source .venv/Scripts/activate
fi

pip install pipenv

deactivate

echo "Installing pipenv dependencies..."
./__python -m pipenv install

echo "Installing npm dependencies..."
npm install

echo "Removing build folders (if exists)..."

rm -rf .webpack
rm -rf dist

echo "Setup complete!"

set +e