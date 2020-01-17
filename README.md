## Author : LU JIANAN 
## Date: 8th Sep 2019

## Setup and installation

If you haven’t installed Rasa NLU and Rasa Core yet, you can do it by navigating to the project directory and running:  
```
pip3 install -r requirements.txt
```

You also need to install a spaCy English language model. You can install it by running:

```
python3 -m spacy download en_core_web_lg
```


## What’s in this starter-pack?

This starter-pack contains some training data and the main files which you can use as the basis of your first custom assistant. It also has the usual file structure of the assistant built with Rasa Stack. This starter-pack consists of the following files:

### Files for Rasa NLU model

- **data/nlu_data.md** file contains training examples of six intents: 
	- greet
	- goodbye
	- thanks
	- deny
	- joke
	- name (examples of this intent contain an entity called 'name')
	- mood
	
- **nlu_config.yml** file contains the configuration of the Rasa NLU pipeline:  
```text
language: "en"

pipeline: spacy_sklearn
```	

### Files for Rasa Core model

- **data/stories.md** file contains some training stories which represent the conversations between a user and the assistant. 
- **domain.yml** file describes the domain of the assistant which includes intents, entities, slots, templates and actions the assistant should be aware of.  
- **actions.py** file contains the code of a custom action which retrieves a Chuck Norris joke by making an external API call.
- **endpoints.yml** file contains the webhook configuration for custom action.  
- **policies.yml** file contains the configuration of the training policies for Rasa Core model.

### Rasa Core model Training Setup

- **Makefile** file contains detail training setup

## Reference

The rasa core and nlu libraries are refered from the following link:
https://github.com/RasaHQ/starter-pack-rasa-stack
