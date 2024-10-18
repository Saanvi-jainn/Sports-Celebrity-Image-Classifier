# Sports Celebrity Image Classification

In this machine learning project, we will classify sports personalities. We will restrict our classification to only 5 people:
1) Maria Sharapova
2) Serena Williams
3) Virat Kohli
4) Roger Federer
5) Lionel Messi

### Folder structure

* <b>static : This contains ui website code</b> 
* <b>server: Contains the Python flask server related code</b>
* <b>model: Contains python notebook for model building</b>
* <b>google_image_scrapping: Contains the code to scrap google for images</b>
* <b>images_dataset: Dataset used for training our model</b>

### Technologies used in this project,

* `Python`
* `Numpy and OpenCV for data cleaning`
* `Matplotlib & Seaborn for data visualization`
* `Sklearn for model building`
* `Jupyter notebook, visual studio code as IDE`
* `Python flask for http server`
* `HTML/CSS/Javascript for UI`

### Installation :

A good practice to start with a new project and use it, is to make a virtual enviornment for the particular project. Here is the steps for making virtual enviornment ::

1. `pip install virtualenv`
2. `python -m virtualenv myenv`

#### Install the dependencies of the App ::

Run commands on python terminal or anaconda terimial or any terminal you are using in your system.

* `pip install -r requirements.txt`

### Test the app:

* Clone the repository: `git clone https://github.com/Acube101/Sports-Celebrity-Image-Classification`
* Go to the project directory
* Go to Server Directory: `cd Server`
* Run the app: `python app.py`
* The development server will be up and running on port 5000 at the URL: http://127.0.0.1:5000/
* Drag an image of your favourite celebrity from the five and hit the classify button. Our app will predict the celebrity name with his/ her image. It will also show us the percentage match of our image with all the five celebrities. 
