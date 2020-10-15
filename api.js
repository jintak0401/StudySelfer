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

export const apiPostChapter = async (type, chapter) => {
  const data = {type: type, chapter: chapter};
  try {
    const retval = await axios.post("http://211.43.12.24:9999/api/diagnose/chapters", data);
    return retval;
  }
  catch (e) {
    console.log(e);
    return {};
  }
}

export const apiPostAnswer = async (time, ans, removedAns) => {
  const data = {time: time, answer: ans, removedAnswer: removedAns};
  try {
    retval = await axios.post("http://211.43.12.24:9999/api/diagnose/answer_data", data);
    return retval;
  }
  catch (e) {
    console.log(e);
    return {};
  }
}