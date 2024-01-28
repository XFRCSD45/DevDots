# from flask import Flask,jsonify,request
# from flask_cors import  CORS
# import pickle
# import numpy as np
# from sklearn.metrics import accuracy_score

# model=pickle.load(open('model.pkl','rb'))
# # y_pred=pickle.load(open('test.pkl','rb'))

# #app instance
# app=Flask(__name__)
# CORS(app)

# @app.route('/',methods=['GET'])
# def return_home():
#     print("server")
#     return jsonify({'message':'Welcome to our API!'})

# @app.route('/personal', methods=['POST'])
# def predict_health():
#     # print("server ke pass hu")
#     data = request.get_json()  # Get input data from the frontend'
#     # formdata=request.form.values()
#     # print("formdata",formdata)
#     # int_value=[int(x) for x in request.form.values() ]
#     # print("array",data.data)
#     # print("Received input_data:", data)
#     input_data = np.array(data).reshape(1, 102)
#     # print("data",input_data)
#     # print("intergr data",int_value)
#     # features=[np.array(int_value)]
    
#     prediction = model.predict(input_data)  # Make prediction using your model
#     # Accuracy=accuracy_score(prediction,y_pred)
#     # print("Accuracy",Accuracy)
#     # print("predicted",prediction[0])
#     # print("predicted value",prediction[0])
#     return jsonify({'result': prediction[0]})  # Send prediction back to frontend

# if __name__=='__main__':
#     app.run()


from flask import Flask,jsonify,request
from flask_cors import  CORS
import pickle
import numpy as np
from sklearn.preprocessing import MinMaxScaler

model=pickle.load(open('model.pkl','rb'))

app = Flask(__name__)
CORS(app)


@app.route('/v1', methods=['POST'])
def card_abandonment():
    print('i amm here')
    data = request.get_json()
    data = np.array(data)
    print(data)
    # data.reshape(-1,1)
    data = data.reshape(1, -1)
    min_max_scaler = MinMaxScaler()
    data = min_max_scaler.fit_transform(data)
    prediction = model.predict(data)
    print("Model prediction : ", prediction)
    
    return jsonify({'prediction': str(prediction[0])})

# if __name__ == '__main__':
#     app.run(debug=True)




@app.route('/')
def index():
    return 'Hello, World!'

if __name__=='__main__':
    app.run(debug=False)