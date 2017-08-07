#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const packager = require('/usr/local/lib/node_modules/electron-packager');

let folder = __dirname;
let dest = path.join(folder, 'dest');
packager({
    'arch' : 'x64',
    'platform' : 'darwin',
    'dir' : `${ folder }`,
    'out' : `${ dest }`,
    'icon' : `${ path.join(folder, './logo.icns') }`,
    'ignore' : ['.DS_Store'],
    'overwrite' : true,
    'electronVersion' : '1.4.12',
    'appCopyright' : 'Copyright (c) 2017 lixinliang',
    'version-string':{
        'ProductName' : 'Photoshop Table',
        'InternalName' : 'Photoshop Table',
        'OriginalFilename' : 'Photoshop Table',
        'CompanyName' : 'lixinliang',
        'FileDescription' : 'Photoshop Table',
    },
}, ( err ) => {
    if (err) {
        console.log(err);
    }
});
