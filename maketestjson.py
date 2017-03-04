import json, codecs

#Make a test numpy array
a = np.arange(15).reshape(5,3) # a 2 by 5 array
b = a.tolist() # nested lists with same data, indices
file_path = "test.json"
json.dump(b, codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)

#Make a variable length lists
c = [[3, 4, 5], [1, 2, 3, 5, 6, 8], [1, 2]]
file_path = "test_varlength.json"
json.dump(c, codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)

#Make some test paths (series of series of x,y pairs, with the same scale as the pixels in the image)
d = [[[0, 100, 200],[0, 100, 200], [1, 50, 100]], [[100, 200, 200, 100, 100, 800],[100, 100, 100, 100, 100, 100],[1, 50, 100, 150, 200, 250, 300]], [[100, 200],[200, 100], [1, 100]]]
file_path = "test_paths.json"
json.dump(d, codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)