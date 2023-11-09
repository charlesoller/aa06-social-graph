// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;

    let user = {
      id: this.currentID,
      name: name
    }

    this.follows[this.currentID] = new Set();
    this.users[this.currentID] = user;

    return this.currentID;
  }

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    if(!this.getUser(userID1) || !this.getUser(userID2)) return false;

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    return this.follows[userID]
  }

  getFollowers(userID) {
    let followers = new Set();

    for(let item in this.follows){
      if(this.follows[item].has(userID)){
        followers.add(Number(item));
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let recc = new Set();
    let stack = [...this.getFollows(userID)];
    console.log(stack)

    let counter = degrees
    while(counter){
      let curr = stack.pop();
      let currFollows = this.getFollows(curr);
      console.log(currFollows);
      currFollows.forEach(follow => {
        if(!recc.has(follow)){
          recc.add(follow);
          stack.push(follow);
        }
      })

      counter--;
    }

    return [...recc];
  }
}

module.exports = SocialNetwork;
