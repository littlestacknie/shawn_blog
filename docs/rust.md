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

### Implementing structs and enums

该章节中为结构体中定义方法，分为两种：

1. 常见的可以通过 . 进行调用的方法（需要传自身地址为入参）
2. new 方法等静态方法（e.g. String::from, Vec::new，该类型方法无需传递自身地址，会返回一个实例）

有点类似于 js 中的类，但是又不完全相同。。。

```rust
//impl在struct中的应用
#[derive (Debug)]
struct Animal {
    age: u8,
    animal_type: AnimalType,
}
#[derive(Debug)]
enum AnimalType {
    Cat,
    Dog,
}
impl Animal {
    fn new() -> Self {   //此处的self可理解为类里面的this,不可写为Animal
        Self {
            age: 0,
            animal_type: AnimalType::Cat,
        }
    }
    fn change_to_dog(&mut self) {
        println!("Change to dog!");
        self.animal_type = AnimalType::Dog;
    }
    fn change_to_cat(&mut self) {
        println!("Change to cat!");
        self.animal_type = AnimalType::Cat;
    }
    fn check_type(&self) {
        match self.animal_type {
            AnimalType::Cat => println!("The animal is cat!"),
            AnimalType::Dog => println!("The animal is dog!"),
        }
    }
}
fn main() {
    let mut new_animal = Animal::new();
    new_animal.check_type();
    new_animal.change_to_dog();
    new_animal.check_type();
    new_animal.change_to_cat();
    new_animal.check_type();
}


//impl在enum中的应用
enum Mood {
    Good,
    Bad,
    Sleepy,
}
impl Mood {
    fn check(&self) {
        match self {
            Mood::Good => println!("Feeling good!"),
            Mood::Bad => println!("Eh, not feeling so good"),
            Mood::Sleepy => println!("Need sleep NOW"),
        }
    }
}
fn main() {
    let my_mood = Mood::Sleepy;
    my_mood.check();
}
```

### Destructuring

可以对实例化的结构体进行解构

```rust
struct Person { // make a simple struct for a person
    name: String, //此处必须使用String
    real_name: String,
    height: u8,
    happiness: bool
}
fn main() {
    let papa_doc = Person { // create variable papa_doc
        name: "Papa Doc".to_string(),
        real_name: "Clarence".to_string(),
        height: 170,
        happiness: false
    };

    let Person { // destructure papa_doc
        name: a,
        real_name: b,
        height: c,
        happiness: d
    } = papa_doc;
    println!("They call him {} but his real name is {}. He is {} cm tall and is he happy? {}", a, b, c, d);
}

```

```rust
struct City {
    name: String,
    name_before: String,
    population: u32,
    date_founded: u32,
}
impl City {
    fn new(name: String, name_before: String, population: u32, date_founded: u32) -> Self {
        Self {
            name,
            name_before,
            population,
            date_founded,
        }
    }
}
fn process_city_values(city: &City) {
    let City {
        name,
        name_before,
        population,
        date_founded,
    } = city;
        // now we have the values to use separately
    let two_names = vec![name, name_before];
    println!("The city's two names are {:?}", two_names);
}
fn main() {
    let tallinn = City::new("Tallinn".to_string(), "Reval".to_string(), 426_538, 1219);
    process_city_values(&tallinn);
}
```

### References and the dot operator

when you use the `.` operator, you don't need to worry about `*`.

```rust
struct Item {
    number: u8,
}
impl Item {
    fn compare_number(&self, other_number: u8) { // takes a reference to self
        println!("Are {} and {} equal? {}", self.number, other_number, self.number == other_number);
            // We don't need to write *self.number
    }
}
fn main() {
    let item = Item {
        number: 8,
    };
    let reference_item = &item; // This is type &Item
    let reference_item_two = &reference_item; // This is type &&Item
    item.compare_number(8); // the method works
    reference_item.compare_number(8); // it works here too
    reference_item_two.compare_number(8); // and here
}
```

### Generics

类似于 Ts 中的泛型，不去指定入参和出参的具体类型

```rust
fn return_number<T>(number: T) -> T {
    println!("Here is your number.");
    number
}

fn main() {
    let number = return_number("jlj");
    println!("{}", number);
}
```

如果想打印需要变量值，需 use Debug

```rust
use std::fmt::Debug; // Debug is located at std::fmt::Debug. So now we can just write 'Debug'.
fn print_number<T: Debug>(number: T) { // <T: Debug> is the important part
    println!("Here is your number: {:?}", number);
}
fn main() {
    print_number(5);
}
```

```rust
use std::fmt::Debug;  //为T变量添加debug

#[derive(Debug)]  //为结构体添加debug
struct Animal {
    name: String,
    age: u8,
}

fn print_item<T: Debug>(item: T) {
    println!("Here is your item: {:?}", item);
}
fn main() {
    let charlie = Animal {
        name: "Charlie".to_string(),
        age: 1,
    };
    let number = 55;
    print_item(charlie);
    print_item(number);
}
```

```rust
use std::fmt::Display;
use std::cmp::PartialOrd;

fn compare_and_display<T: Display, U: Display + PartialOrd>(statement: T, num_1: U, num_2: U) {
    println!("{}! Is {} greater than {}? {}", statement, num_1, num_2, num_1 > num_2);
}
fn main() {
    compare_and_display("Listen up!", 9, 8);
}
```

> This prints `Listen up!! Is 9 greater than 8? true`.
>
> So `fn compare_and_display(statement: T, num_1: U, num_2: U)` says:
>
> - The function name is `compare_and_display`,
> - The first type is T, and it is generic. It must be a type that can print with {}.
> - The next type is U, and it is generic. It must be a type that can print with {}. Also, it must be a type that can compare (use `>`, `<`, and `==`).
>
> Now we can give `compare_and_display` different types. `statement` can be a `String`, a `&str`, anything with Display.

To make generic functions easier to read, we can also write it like this with `where` right before the code block:

```rust
//Using where is a good idea when you have many generic types.
use std::cmp::PartialOrd;
use std::fmt::Display;

fn compare_and_display<T, U>(statement: T, num_1: U, num_2: U)
where
    T: Display,
    U: Display + PartialOrd,
{
    println!("{}! Is {} greater than {}? {}", statement, num_1, num_2, num_1 > num_2);
}
fn main() {
    compare_and_display("Listen up!", 9, 8);
}
```
