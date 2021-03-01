from skimage.metrics import structural_similarity as ssim
import matplotlib.pyplot as plt
from decimal import Decimal
import numpy as np
import sys
import cv2
import glob
import time
import json


def get_ssim_score(image_path_1, image_path_2):
    loaded_img_1 = cv2.imread(image_path_1)
    loaded_img_2 = cv2.imread(image_path_2)
    (H, W, Z) = loaded_img_1.shape
    loaded_img_2 = cv2.resize(loaded_img_2, (W, H))
    converted_img_1 = cv2.cvtColor(loaded_img_1, cv2.COLOR_BGR2GRAY)
    converted_img_2 = cv2.cvtColor(loaded_img_2, cv2.COLOR_BGR2GRAY)
    ssim_similarity_score = ssim(converted_img_1, converted_img_2)
    # print(f"SSIM = {ssim_similarity_score}")
    return ssim_similarity_score


def compare_images_using_ssim(basePath='/Users/abdulaliyev/web-projects/del/imgs/6', similarity_percentage="0.96"):
    # print(f"compare_images_using_ssim__start::")
    similarity_percentage = Decimal(similarity_percentage)
    all_images = glob.glob(basePath + "/**/*.jpg", recursive=True)
    print(f"compare_images_using_ssim__all_images_length::{len(all_images)}")
    results = []
    already_added_indexes = {}

    for i, outer_img in enumerate(all_images):
        # print(
        #     f"compare_images_using_ssim__percentage::{round(((i+1) / len(all_images)) * 100)}")
        # print(
        #     f"Comparing image {i+1}, {round(((i+1) / len(all_images)) * 100)}% completed")
        if i not in already_added_indexes:
            result = []
            for j, inner_img in enumerate(all_images):
                if i != j and get_ssim_score(outer_img, inner_img) > similarity_percentage:
                    if len(result) == 0:
                        result.append(outer_img)
                        result.append(inner_img)
                    else:
                        result.append(inner_img)
                    already_added_indexes[j] = True

            time.sleep(0.5)

            if len(result) > 0:
                results.append(result)

        print(f"compare_images_using_ssim__index_completed::{i}")

    print(
        f"compare_images_using_ssim__results::{json.dumps(results)}")


if __name__ == "__main__":
    if (len(sys.argv) >= 3):
        compare_images_using_ssim(sys.argv[1], sys.argv[2])
    else:
        print("Provide basepath and similarity percentage")
