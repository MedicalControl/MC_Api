import * as tf from '@tensorflow/tfjs-node';

const loadModel = async (): Promise<tf.LayersModel> => {
  const model = await tf.loadLayersModel('file://path/to/model/model.json');
  return model;
};

export const makePrediction = async () => {
  try {
    const model = await loadModel();

    // Ajusta los datos de entrada de acuerdo al modelo que estás utilizando
    const inputData = tf.tensor2d([[/* datos de entrada */]]);
    
    // La predicción puede ser de varios tipos, así que se usa 'tf.Tensor | tf.Tensor[]'
    const prediction = model.predict(inputData) as tf.Tensor | tf.Tensor[];
    
    // Verifica si la predicción es un tensor o un arreglo de tensores
    if (Array.isArray(prediction)) {
      prediction.forEach((tensor) => tensor.print());
    } else {
      prediction.print();
    }
  } catch (error) {
    console.error('Error al hacer la predicción:', error);
  }
};

// Llamar a la función para hacer una predicción
