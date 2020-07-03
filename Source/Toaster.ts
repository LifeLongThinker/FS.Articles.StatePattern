namespace Appliances
{
    //
    // EXPORTED TYPES
    //
    export class Toaster implements ToasterOperations {
        private _state: ToasterState = new IdleState()

        constructor() {
            this.logCurrentState()
        }

        public insertBread(): void {
            this._state = this._state.insertBread()
            this.logCurrentState()
        }
        public pullLever(): void {
            this._state = this._state.pullLever()
            this.logCurrentState()
        }
        public ejectBread(): void {
            this._state = this._state.ejectBread()
            this.logCurrentState()
        }
        public removeBread(): void {
            this._state = this._state.removeBread()
            this.logCurrentState()
        }

        private logCurrentState(): void {
            console.log(this._state)
        }
    }
    export interface ToasterOperations {
        insertBread(): void
        pullLever(): void
        ejectBread(): void
        removeBread(): void
    }

    //
    // HIDDEN TYPES
    //
    abstract class ToasterState implements ToasterOperations {
        public insertBread(): ToasterState {
            throw new Error("Invalid operation")
        }
        public pullLever(): ToasterState {
            throw new Error("Invalid operation")
        }
        public ejectBread(): ToasterState {
            throw new Error("Invalid operation")
        }
        public removeBread(): ToasterState {
            throw new Error("Invalid operation")
        }
    }
    class IdleState extends ToasterState {
        public insertBread(): ToasterState {
            return new BreadInsertedState()
        }
    }
    class BreadInsertedState extends ToasterState {
        public pullLever(): ToasterState {
            return new ToastingState()
        }
    }
    class ToastingState extends ToasterState {
        public ejectBread(): ToasterState {
            return new BreadEjectedState()
        }
    }
    class BreadEjectedState extends ToasterState {
        public removeBread(): ToasterState {
            return new IdleState()
        }
    }
}

console.log("testing allowed transitions")
var toaster = new Appliances.Toaster()
toaster.insertBread()
toaster.pullLever()
toaster.ejectBread()
toaster.removeBread()

console.log("testing disallowed transitions")
var toaster2 = new Appliances.Toaster()
toaster2.pullLever()