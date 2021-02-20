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
#################################################

#################################################
# This function:
# Loads the JPEG image at the given path
# Decodes the JPEG image to a uint8 W X H X 3 tensor
# Resizes the image to 224 x 224 x 3 tensor
# Returns the pre processed image as 224 x 224 x 3 tensor
#################################################


def load_img(path):

    # Reads the image file and returns data type of string
    img = tf.io.read_file(path)

    # Decodes the image to W x H x 3 shape tensor with type of uint8
    img = tf.io.decode_jpeg(img, channels=3)

    # Resize the image to 224 x 244 x 3 shape tensor
    img = tf.image.resize_with_pad(img, 224, 224)

    # Converts the data type of uint8 to float32 by adding a new axis
    # This makes the img 1 x 224 x 224 x 3 tensor with the data type of float32
    # This is required for the mobilenet model we are using
    img = tf.image.convert_image_dtype(img, tf.float32)[tf.newaxis, ...]

    return img

#################################################
# This function:
# Loads the mobilenet model in TF.HUB
# Makes an inference for all images stored in a local folder
# Saves each of the feature vectors in a file
#################################################

# Stopped here. Need to figure out a way to send the similarity sets to node. Also, forwat the sets in the desired format before...


def log_message(msg):
    file_object = open('logs.txt', 'a')
    file_object.write(msg)
    file_object.close()


def get_image_feature_vectors(basePath='/Users/abdulaliyev/web-projects/del/imgs/2/*.jpg'):
    log_message('get_image_feature_vectors in python fired  ...  \n')

    i = 0
    # start_time = time.time()

    # Definition of module with using tfhub.dev handle
    # module_handle = "https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/feature_vector/4"
    module_handle = "./imagenet_mobilenet_v2_140_224_feature_vector_4"

    # Load the module
    module = hub.load(module_handle)
    log_message('77 module = hub.load(module_handle) \n')

    mapped_data = []

    # Loops through all images in a local folder assuming gif
    for filename in glob.glob(basePath):
        # filename = "/Users/abdulaliyev/web-projects/del/imgs/2/bb_copy_3.jpg"

        i = i + 1

        # Loads and pre-process the image
        img = load_img(filename)

        # Calculate the image feature vector of the img
        features = module(img)

        # Remove single-dimensional entries from the 'features' array
        feature_set = np.squeeze(features)

        # Saves the image feature vectors into a file for later use

        # outfile_name = os.path.basename(filename).split('.')[0] + ".npz"
        # os.path.basename(filename) = "bb_copy_1.jpg"
        uniqueId = uuid.uuid1()

        mapped_data.append({
            'filePath': filename,
            'mappedId': str(uniqueId)
        })

        outfile_name = str(uniqueId) + ".npz"
        out_path = os.path.join('./vectors/', outfile_name)

        # Saves the 'feature_set' to a text file
        np.savetxt(out_path, feature_set, delimiter=',')

    log_message('115 ready to open(mapper.json \n')
    # Writes the 'named_nearest_neighbors' to a json file
    with open('mapper.json', 'w') as out:
        json.dump(mapped_data, out)
        log_message('119 done dumping mapper.json \n')


if __name__ == "__main__":
    if (len(sys.argv) > 0):
        get_image_feature_vectors(sys.argv[1])
    else:
        print("Provide base path for get_image_feature_vectors() function")
