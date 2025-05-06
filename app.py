from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS

# Path to your dataset
DATASET_PATH = 'D:\Projects\heart.csv'

# Load the dataset
data = pd.read_csv(DATASET_PATH)

# Selecting all the features for training as you provided
features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
X = data[features]  # These are the features we'll use for training
y = data['target']  # The target column represents heart disease outcome

# Split the data for training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the logistic regression model using all the features
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)


@app.route('/predict', methods=['POST'])
def predict():
    # Extract the feature values from the request JSON
    data = request.json
    age = int(data['age'])
    sex = int(data['sex'])
    cp = int(data['cp'])
    trestbps = int(data['trestbps'])
    chol = int(data['chol'])
    fbs = int(data['fbs'])
    restecg = int(data['restecg'])
    thalach = int(data['thalach'])
    exang = int(data['exang'])
    oldpeak = float(data['oldpeak'])
    slope = int(data['slope'])
    ca = int(data['ca'])
    thal = int(data['thal'])

    # Create a numpy array with the input data matching the feature order
    input_data = np.array([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]])

    # Make a prediction using the logistic regression model
    prediction = model.predict(input_data)[0]
    accuracy = model.score(X_test, y_test)
    # Return the prediction as a JSON response
    return jsonify({'prediction': int(prediction), 'accuracy': round(accuracy,4)})

if __name__ == '__main__':
    app.run(debug=True)
