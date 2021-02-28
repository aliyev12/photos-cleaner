
#################################################
# This script reads image feature vectors from a folder
# and saves the image similarity scores in json file
# by Erdem Isbilen - December/2019
#################################################

# Numpy for loading image feature vectors from file
import numpy as np
from decimal import Decimal
import sys

# Time for measuring the process time
import time

# Glob for reading file names in a folder
import glob
import os.path
import os
import shutil

# json for storing data in json file
import json

# Annoy and Scipy for similarity calculation
from annoy import AnnoyIndex
from scipy import spatial
from utils import clear_vectors_dir
#################################################

#################################################
# This function reads from 'mapper.json' file
# Looks for a specific 'mappedId' value
# Returns the file path when file image names are matched
# So it is used to find file path based on the file image name
#################################################


def log_message(msg):
    file_object = open('logs.txt', 'a')
    file_object.write(msg)
    file_object.close()


def match_id(file_id):
    with open('./mapper.json') as json_file:
        for file in json_file:
            mapped_data = json.loads(file)

            for mapped_file_info in mapped_data:

                if file_id == mapped_file_info['mappedId']:
                    return mapped_file_info['filePath']

#################################################
# This function;
# Reads all image feature vectores stored in /feature-vectors/*.npz
# Adds them all in Annoy Index
# Builds ANNOY index
# Calculates the nearest neighbors and image similarity metrics
# Stores image similarity scores with productID in a json file
#################################################


def cluster(similarity_percentage="0.96"):
    similarity_percentage = Decimal(similarity_percentage)
    log_message(
        f"in cluster and similarity_percentage provided is = {similarity_percentage}\n")

    file_object = open('logs.txt', 'a')
    # Append 'hello' at the end of file
    file_object.write('cluster fired  ...  ')
    # Close the file
    file_object.close()
    # start_time = time.time()
    # Defining data structures as empty dict
    file_index_to_file_name = {}
    file_index_to_file_vector = {}
    file_index_to_id = {}

    # Configuring annoy parameters
    dims = 1792
    n_nearest_neighbors = 20
    trees = 10000

    # Reads all file names which stores feature vectors
    allfiles = glob.glob('./vectors/*.npz')
    t = AnnoyIndex(dims, metric='angular')

    for i, file_path in enumerate(allfiles):
        # Reads feature vectors and assigns them into the file_vector
        file_vector = np.loadtxt(file_path)

        # Assigns file_name, feature_vectors and corresponding product_id
        file_name = os.path.basename(file_path).split('.')[0]
        file_index_to_file_name[i] = file_name
        file_index_to_file_vector[i] = file_vector
        file_index_to_id[i] = match_id(file_name)

        # Adds image feature vectors into annoy index
        t.add_item(i, file_vector)

    # Builds annoy index
    t.build(trees)

    named_nearest_neighbors = []

    # Loops through all indexed items
    for i in file_index_to_file_name.keys():

        # Assigns master file_name, image feature vectors and product id values
        # master_file_name = file_index_to_file_name[i]
        master_vector = file_index_to_file_vector[i]
        initial_file_path = file_index_to_id[i]

        # Calculates the nearest neighbors of the master item
        nearest_neighbors = t.get_nns_by_item(i, n_nearest_neighbors, 100000)

        # Loops through the nearest neighbors of the master item
        for j in nearest_neighbors:
            # Assigns file_name, image feature vectors and product id values of the similar item
            # neighbor_file_name = file_index_to_file_name[j]
            neighbor_file_vector = file_index_to_file_vector[j]
            neighbor_initial_file_path = file_index_to_id[j]

            # Calculates the similarity score of the similar item
            similarity = 1 - \
                spatial.distance.cosine(master_vector, neighbor_file_vector)
            rounded_similarity = int((similarity * 10000)) / 10000.0

            # Appends master product id with the similarity score
            # and the product id of the similar items
            named_nearest_neighbors.append({
                'similarity': rounded_similarity,
                'fileId': file_index_to_file_name[j],
                'masterPath': initial_file_path,
                'similarPath': neighbor_initial_file_path
            })

    already_checked = {}
    similarity_sets = {}
    for i, similarity in enumerate(named_nearest_neighbors):
        if similarity['masterPath'] == similarity['similarPath']:
            continue

        if similarity['similarity'] > similarity_percentage:
            if similarity['masterPath'] in already_checked or similarity['similarPath'] in already_checked:
                set_key = already_checked[similarity['masterPath']]
                new_set = similarity_sets[set_key].copy()

                if not similarity['masterPath'] in new_set:
                    new_set.append(similarity['masterPath'])
                if not similarity['similarPath'] in new_set:
                    new_set.append(similarity['similarPath'])

                similarity_sets[set_key] = new_set
                already_checked[similarity['masterPath']] = set_key
                already_checked[similarity['similarPath']] = set_key

            else:
                similarity_sets[str(i)] = [
                    similarity['masterPath'], similarity['similarPath']]
                already_checked[similarity['masterPath']] = str(i)
                already_checked[similarity['similarPath']] = str(i)

    similarities_arr = []
    for key in similarity_sets:
        similarities_arr.append(similarity_sets[key])

    log_message('ready to json.dumps(similarities_arr \n')
    print(json.dumps(similarities_arr))
    with open('similarities.json', 'w') as out:
        json.dump(similarities_arr, out)

        # find a reason why this script is not stdOuting...

    # Writes the 'named_nearest_neighbors' to a json file
    with open('nearest_neighbors.json', 'w') as out:
        json.dump(named_nearest_neighbors, out)

        clear_vectors_dir()
        # for filename in os.listdir('./vectors'):
        #     file_path = os.path.join('./vectors', filename)
        #     try:
        #         if os.path.isfile(file_path) or os.path.islink(file_path):
        #             os.unlink(file_path)
        #         # elif os.path.isdir(file_path):
        #         #     shutil.rmtree(file_path)
        #     except Exception as e:
        #         print('Failed to delete %s. Reason: %s' % (file_path, e))

        with open('mapper.json', 'w'):
            pass
        # with open('similarities.json', 'w'):
        #     pass
    # print(json.dumps(similarities_arr))
    return similarity_sets


if __name__ == "__main__":
    if (len(sys.argv) >= 2):
        cluster(sys.argv[1])
    else:
        cluster()
