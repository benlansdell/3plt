import json, codecs
import tracks 

def main():
	usage = """makejson.py [tracks] [out_file]

	Convert tracks csv to json file that javascript can read
		
	Ben Lansdell
	03/03/2017
	"""
	
	parser = argparse.ArgumentParser()
	parser.add_argument('vid_in', help='video file for animation')
	parser.add_argument('tracks_in', help='csv file with tracks')
	args = parser.parse_args()

	tracks = tracks.load_tracks_csv('./tracks/20160412_dupreannotation_stk0001.csv')
	out_file = 'paths.json'
	d = []
	for k in tracks.keys():
		xs = []
		ys = []
		ts = []
		for idx in range(len(tracks[k])):
			xs.append(tracks[k][idx][0])
			ys.append(tracks[k][idx][1])
			ts.append(tracks[k][idx][2])
		d.append([xs,ys,ts])
	json.dump(d, codecs.open(out_file, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)

if __name__ == "__main__":
	sys.exit(main())