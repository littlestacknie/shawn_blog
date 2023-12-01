### Vectors

向量，rust 中数组分为定长 arrays 和不定长 vectors，不定长数组每一项类型相同，若初始化为后未赋值会报错，同时其容量会线性扩容，每次增加 4 个字节，故若知道数组长度，可在定义时传入数组长度，以提高运行效率。

### Tuples

元组，以( )表示，内部可以是各种类型的各种数量的变量，访问元组中某索引位置的值使用的是. 操作，且元组可用于数值解构，当遇到需要的变量使用\_代替即可。

### Control Flow

1. if 不用加括号（）

2. match 的写法（等同于 switch)

   ```rust
   //match用于判断
   fn main() {
       let my_number: u8 = 5;
       match my_number {
           0 => println!("it's zero"),
           1 => println!("it's one"),
           2 => println!("it's two"),
           _ => println!("It's some other number"),
       }
   }
   //match用于赋值
   fn main() {
       let my_number = 5;
       let second_number = match my_number {
           0 => 0,
           5 => 10,
           _ => 2,
       };
   }
   //match与if相结合
   fn main() {
       let sky = "cloudy";
       let temperature = "warm";

       match (sky, temperature) {
           ("cloudy", "cold") => println!("It's dark and unpleasant today"),
           ("clear", "warm") => println!("It's a nice day"),
           ("cloudy", "warm") => println!("It's dark but not bad"),
           _ => println!("Not sure what the weather is."),
       }
   }

   ```

### Structs

```rust
//first type
struct FileDirectory;
fn main() {}
//second type
struct Colour(u8, u8, u8);
fn main() {
    let my_colour = Colour(50, 0, 50); // Make a colour out of RGB (red, green, blue)
    println!("The second part of the colour is: {}", my_colour.1);
}
//third type
struct Country {
    population: u32,
    capital: String,
    leader_name: String
}
fn main() {
    let population = 500_000;
    let capital = String::from("Elista");
    let leader_name = String::from("Batu Khasikov");

    let kalmykia = Country {
        population,
        capital,
        leader_name,
    };
}
```

### Enums

```rust
//为enum赋值
enum ThingsInTheSky {
    Sun(String),
    Stars(String),
}
fn create_skystate(time: i32) -> ThingsInTheSky {
    match time {
        6..=18 => ThingsInTheSky::Sun(String::from("I can see the sun!")),
        _ => ThingsInTheSky::Stars(String::from("I can see the stars!")),
    }
}
fn check_skystate(state: &ThingsInTheSky) {
    match state {
        ThingsInTheSky::Sun(description) => println!("{}", description),
        ThingsInTheSky::Stars(n) => println!("{}", n),
    }
}
fn main() {
    let time = 8;
    let skystate = create_skystate(time);
    check_skystate(&skystate);
}

//全局引入enum
enum Mood {
    Happy,
    Sleep,
    NotBad,
    Angry,
}
fn match_mood(mood: &Mood) -> i32 {
    use Mood::*;
    let happiness_level = match mood {
        Happy => 10,
        Sleep => 6,
        NotBad => 7,
        Angry => 2,
    };
    happiness_level
}
fn main() {
    let my_mood = Mood::Happy;
    let happiness_level = match_mood(&my_mood);
    println!("Out of 1 to 10,my happiness is {}",happiness_level);
}

//enum 的默认赋值    和TS相同，数值默认加一
enum Season {
    Spring, // If this was Spring(String) of something it wouldn't work
    Summer,
    Autumn,
    Winter,
}
fn main() {
    use Season::*;
    let four_seasons = vec![Spring,Summer,Autumn,Winter];
    for season in four_seasons {
        println!("{}", season as u32);// 0 1 2 3
    }
}

//enum中类型可以不一致
enum Number {
    U32(u32),
    I32(i32),
}
fn main() {}
```

### Loop

```rust
//无限loop——loop的使用及loop的命名
fn main() {
    let mut counter = 0;
    let mut counter2 = 0;
    println!("Now entering the first loop.");

    'first_loop: loop {
        // Give the first loop a name
        counter += 1;
        println!("The counter is now: {}", counter);
        if counter > 9 {
            // Starts a second loop inside this loop
            println!("Now entering the second loop.");

            'second_loop: loop {
                // now we are inside 'second_loop
                println!("The second counter is now: {}", counter2);
                counter2 += 1;
                if counter2 == 3 {
                    break 'first_loop; // Break out of 'first_loop so we can exit the program
                }
            }
        }
    }
}
//while loop
fn main() {
    let mut counter = 0;
    while counter < 5 {
        counter +=1;
        println!("The counter is now: {}", counter);
    }
}
//for loop
fn main() {
    for number in 0..3 {
        println!("The number is {}", number);
    }
    for number in 0..=3 {
        println!("The number is {}", number);
    }
    for _number in 0..3 {  //means _number may not be used
        println!("Printing the same thing three times");
    }
}
//break and return a value
fn main() {
    let mut counter = 5;
    let my_number = loop {
        counter +=1;
        if counter % 53 == 3 {
            break counter;
        }
    };
    println!("{}", my_number);
}
```
