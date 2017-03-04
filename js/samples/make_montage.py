import os

fn_in = './20160412-stk0003/combined.tif'
bn_out = './20160412-stk0003/'
nF = 250
p = 10 

for r1 in range(0, nF, p):
	r2 = r1 + p-1
	cmd = 'montage %s[%d-%d] -tile 10x1 -geometry 256x256 %s/tiled_%04d.jpg'%(fn_in, r1, r2, bn_out, r1)
	os.system(cmd)