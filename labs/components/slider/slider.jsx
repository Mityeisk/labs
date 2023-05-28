import React, {useState, createRef} from 'react';
import {View, Text, FlatList, StyleSheet, useWindowDimensions, Image, TouchableOpacity} from 'react-native';

// Data will be used to compose our slides
const data = [
  {
    color: '#44b5a1',
    image: 'https://opendoodles.s3-us-west-1.amazonaws.com/roller-skating.png',
  },
  {
    color: '#fa458c',
    image: 'https://opendoodles.s3-us-west-1.amazonaws.com/zombieing.png',
  },
  {
    color: '#2ecc71',
    image: 'https://opendoodles.s3-us-west-1.amazonaws.com/ice-cream.png',
  },
];

const Slider = () => {
  // Width of the window will be width of our slides
  const windowWidth = useWindowDimensions().width;
  // Ref to the FlatList element. We use it to access its methods
  const slider = createRef(null);
  // Slider state contains active item and offset position
  const [sliderState, setSliderState] = useState({
    item: 0,
    offset: 0,
  });

  // Update slider state on change event
  const slideChanged = e => {
    const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);

    setSliderState({
      item: item,
      offset: item * windowWidth,
    });
  };

  // Renderer function takes the data as an input and outputs the view, should be customized
  const renderer = ({item}) => (
    <View style={{width: windowWidth}}>
      <View style={{...styles.slide, backgroundColor: item.color}}>
        <Image resizeMode="cover" style={styles.image} source={{uri: item.image}} />
      </View>
    </View>
  );

  // Renders control buttons
  const button = direction => (
    <TouchableOpacity
      onPress={() =>
        slider.current.scrollToOffset({
          offset: direction === 'BACK' ? sliderState.offset - windowWidth : sliderState.offset + windowWidth,
          animated: true,
        })
      }>
      <Text style={styles.buttons}>{direction}</Text>
    </TouchableOpacity>
  );

  // Renders pagination dots
  const dots = () => (
    <View style={styles.dotGroup}>
      {data.map((_, index) => (
        <View key={index} style={[styles.dot, sliderState.item === index ? styles.dotActive : null]} />
      ))}
    </View>
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderer}
        ref={slider}
        keyExtractor={(_, index) => index} // Set unique key for each element
        horizontal={true} // Transpose the slider horizontally
        pagingEnabled={true} // Snap to the side
        showsHorizontalScrollIndicator={false} // Hide scrollbar
        onScroll={slideChanged} // Fire slideChanged on scroll event
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })} // Used for optimization to eliminate recurred measurement calculations
      />
      <View style={styles.controls}>
        {button('BACK')}
        {dots()}
        {button('NEXT')}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: 'wheat',
    borderRadius: 50,
  },
  controls: {
    position: 'absolute',
    width: '100%',
    bottom: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  dotActive: {
    backgroundColor: '#ffffff',
  },
  buttons: {
    fontSize: 14,
    color: '#ffffff',
    marginHorizontal: 14,
    padding: 15,
  },
});

export default Slider;