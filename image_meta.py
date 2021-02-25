import os
import inspect
from PIL import Image
from PIL.ExifTags import TAGS


class ImageMeta:
    # Class Variable
    # something = 'something'

    # The init method or constructor
    def __init__(self, img_path):
        # Instance Variable
        self.img_path = img_path

    def stat_to_json(self) -> dict:
        s_obj = os.stat(self.img_path)
        return {k: getattr(s_obj, k) for k in dir(s_obj) if k.startswith('st_')}

    def get_attributes(self):
        os_obj = os.stat(self.img_path)
        attributes = inspect.getmembers(
            os_obj, lambda a: not(inspect.isroutine(a)))
        return [a for a in attributes if a[0].startswith('st_')]

    def get_img_exif(self):
        result = []

        with open(self.img_path, 'rb') as f:
            image = Image.open(f)

            # extract EXIF data
            exifdata = image.getexif()

            for tagid in exifdata:
                # getting the tag name instead of tag id
                tagname = TAGS.get(tagid, tagid)
                # passing the tagid to get its respective value
                value = exifdata.get(tagid)
                result.append({
                    "tagname": tagname,
                    "value": value
                })

        return result
