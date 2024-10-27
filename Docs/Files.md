# Create a new React Native project
npx react-native init AwafiMill

# Navigate to the project directory
cd AwafiMill

# Install necessary dependencies
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context redux react-redux redux-thunk axios

# Initialize Git repository
git init




# Create folders
mkdir src/components/common src/components/screens src/containers src/hooks src/navigation src/reducers src/sagas src/services src/store src/styles src/utils

# Create dummy files
touch src/components/common/Header.js src/components/screens/HomeScreen.js src/containers/AppContainer.js src/hooks/useAuth.js src/navigation/RootNavigator.js src/reducers/index.js src/sagas/authSaga.js src/services/apiService.js src/store/store.js src/styles/theme.js src/utils/constants.js