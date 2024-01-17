module.exports = (mongoose, mongoosePaginate) => {

    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    );

    schema.plugin(mongoosePaginate);
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tutorial = mongoose.model("tutorial", schema);

    /*Tutorial.paginate(query, options)
      .then(result => {})
      .catch(error => {});*/

    return Tutorial;
  };