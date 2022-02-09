import { classifier } from './clasifyeConfig';

//get the title and content as text return 'tag'
const analyze = (text: string): string => {
  return classifier.classify(text);
};

export { analyze };

// console.log(analyze('300$$'));
