E-com is an E-commerce project built using MEAN stack and the business logic is first built
the folders Models,routes contains the basic schema model and the method to handle post , get ,put, delete
requests.
The required packages are then installed and the package.json file can be referred to check the installed packages
and simply the npm install command can be used to install them all in local repository.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Uploading images to the Server
1.Install Multer library
https://www.npmjs.com/package/multer ->DiskStorage
start from here for making that upload function

2.Configure the backend to accept the file upload
3.User may have two pic with same name which may affect our functionality
so should change the name of the received file internally via functions
//for making the image uplaod
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads') //making the file upload to the folder public / uploads
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-")
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storage })
then move to the post request location and start adding it.

4.Set allowed image types
Refer MIME types
