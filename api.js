import axios from 'axios';
import { Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

export const apiTestQuests = async () => {
  try {
    const { data } = await axios.get(
      'http://211.43.12.24:9999/api/try_test/19년수능'
    );
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const apiTestSolutions = async () => {
  try {
    const { data } = await axios.get(
      'http://211.43.12.24:9999/api/solutions/19년수능'
    );
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const apiTestAns = async () => {
  try {
    const { data } = await axios.get(
      'http://211.43.12.24:9999/api/answers/19년수능'
    );
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};
