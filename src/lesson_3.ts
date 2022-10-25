class Key {
	private signature:number;

	constructor(){
		this.signature = Math.random();
	}

	getSignature(){
		return this.signature
	}
}

class Person {
	constructor(private key:Key){}

	getKey():Key{
		return this.key
	}
}

abstract class House {
	protected door= false;
	private tenants: Person[]=[];

	constructor(protected key:Key){}

	comeIn(person:Person ): void{
		if(!this.door){
			throw new Error('Sorry, door is close')
		}

		this.tenants.push(person)
		console.log('Person iside');
	}

	abstract openDoor(key:Key):boolean
	abstract closeDoor(key:Key):boolean
}

class MyHouse extends House{
openDoor(key:Key){
	if(key.getSignature() !== this.key.getSignature()){
		throw new Error('Door is close')
	}
	if(this.door){
		console.log('Door already open');
	}
	console.log('Door is opened');
	return this.door= true;
}
closeDoor(key:Key){
	if(key.getSignature() !== this.key.getSignature()){
		throw new Error('Can`t close door, wrong key')
	}
	if(!this.door){
		console.log('Door already closed');
	}
	console.log('Door is closed');
	return this.door = false
}
}

const key = new Key();
const key_2 = new Key();

const house = new MyHouse(key);
const pers = new Person(key);

house.openDoor(pers.getKey());
//house.openDoor(pers.getKey());

house.comeIn(pers);

house.closeDoor(key)
//house.closeDoor(key_2)