#################################################
# Imports and function definitions
#################################################
# For running inference on the TF-Hub module.
import tensorflow as tf
import tensorflow_hub as hub
from cluster_image_feature_vectors import cluster
import sys
import uuid
import json
# For saving 'feature vectors' into a txt file
import numpy as np
# Time for measuring the process time
import time
# Glob for reading file names in a folder
import glob
import os.path
from load_img import load_img
from utils import clear_vectors_dir

# Loads the mobilenet model in TF.HUB
# Makes an inference for all images stored in a local folder
# Saves each of the feature vectors in a file


def log_message(msg):
    file_object = open('logs.txt', 'a')
    file_object.write(msg)
    file_object.close()


# def get_image_feature_vectors(basePath="./" + "/**/*.jpg"):
# def get_image_feature_vectors(basePath='/Users/abdulaliyev/web-projects/del/imgs/2/*.jpg'):
def get_image_feature_vectors(basePath='/Users/abdulaliyev/web-projects/del/imgs/6'):
    clear_vectors_dir()
    # Definition of module with using tfhub.dev handle
    # module_handle = "https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/feature_vector/4"
    module_handle = "./imagenet_mobilenet_v2_140_224_feature_vector_4"
    # Load the module
    module = hub.load(module_handle)
    mapped_data = []

    # Loops through all images in a local folder assuming gif
    for i, filename in enumerate(glob.glob(basePath + "/**/*.jpg", recursive=True)):
        # Loads and pre-process the image
        img = load_img(filename)
        # Calculate the image feature vector of the img
        features = module(img)
        # Remove single-dimensional entries from the 'features' array
        feature_set = np.squeeze(features)
        # Saves the image feature vectors into a file for later use
        uniqueId = uuid.uuid1()
        mapped_data.append({
            'filePath': filename,
            'mappedId': str(uniqueId)
        })
        outfile_name = str(uniqueId) + ".npz"

        if not os.path.exists('vectors'):
            os.makedirs('vectors')

        out_path = os.path.join('./vectors/', outfile_name)

        # Saves the 'feature_set' to a text file
        np.savetxt(out_path, feature_set, delimiter=',')
        print(f"file_vector_completed::{filename}")

    # Writes the 'named_nearest_neighbors' to a json file
    with open('mapper.json', 'w') as out:
        json.dump(mapped_data, out)


if __name__ == "__main__":
    if (len(sys.argv) >= 2):
        get_image_feature_vectors(sys.argv[1])
    else:
        get_image_feature_vectors()
        print("Provide base path for get_image_feature_vectors() function")
